import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { socket } from "../sockets/socket";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const styles = {
  monacoEditor: {
    height: "99%",
    width: "100%",
  },
};

self.MonacoEnvironment = {
  getWorker: function (workerId, label) {
    if (label === "typescript" || label === "javascript") {
      return new Worker(
        new URL(
          "monaco-editor/esm/vs/language/typescript/ts.worker",
          import.meta.url
        ),
        { type: "module" }
      );
    }
    return new Worker(
      new URL("monaco-editor/esm/vs/editor/editor.worker", import.meta.url),
      { type: "module" }
    );
  },
};

const MonacoEditor = ({ content, noteId, title }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const isRemoteChangeRef = useRef(false);

  const saveNote = async (showFeedback = true) => {
    if (!noteId && !editorRef.current) return;

    // setIsSaving(true);
    const data = editorRef.current.getValue();
    try {
      const response = await fetch(`${baseURL}/api/note/${noteId}/force-save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content: data }),
      });

      if (response.status === 200) {
        // setLastSaved(new Date().toISOString());

        if (showFeedback) {
          // Visual feedback for manual save
          const saveBtn = document.getElementById("save-btn");
          if (saveBtn) {
            saveBtn.classList.add("bg-green-600");
            setTimeout(() => {
              saveBtn.classList.remove("bg-green-600");
            }, 1000);
          }
        }
      }
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      // setIsSaving(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveNote(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [noteId, title, content]);

  useEffect(() => {
    if (containerRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: content,
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true,
      });

      return () => {
        editorRef.current.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      const disposable = model.onDidChangeContent(() => {
        if (isRemoteChangeRef.current) {
          isRemoteChangeRef.current = false;
          return;
        }
        const data = model.getValue();
        socket.emit("note-update", {
          noteId,
          heading: title,
          content: data,
        });
      });
      return () => {
        disposable.dispose();
      };
    }
  }, [title]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== content) {
      isRemoteChangeRef.current = true;
      editorRef.current.setValue(content);
    }
  }, [content]);

  return <div ref={containerRef} style={styles.monacoEditor} />;
};

export default MonacoEditor;
