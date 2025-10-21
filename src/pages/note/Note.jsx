import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { socket } from "../../sockets/socket";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../../components/NavBar";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import IconButton from "@mui/material/IconButton";
import MonacoEditor from "../../components/MonacoEditor";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import Tooltip from "@mui/material/Tooltip";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const styles = {
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    my: 0,
    py: 0,
    px: 0,
    mx: 0,
  },
  mainContainer: {
    // border: "1px solid black",
    height: "510px",
  },
  backBtn: {
    // backgroundColor: "#68369B",
    border: "1px solid #68369B",
    width: 25,
    height: 25,
    mr: 2,
    ml: 2,
  },
  titleTextInputBox: {
    disableUnderline: false,
    sx: {
      fontSize: 12,
      fontWeight: 500,
      paddingTop: 0,
      paddingBottom: 0,
      px: 1,
      minHeight: "auto", // remove default min-height
      "& input": {
        padding: 0, // remove input padding
        height: 25, // set desired height
        width: 300,
        lineHeight: "14px",
      },
    },
  },
  pasteBtn: {
    width: 30,
    height: 30,
    mr: 1,
  },
  saveBtn: {
    width: 30,
    height: 30,
    mr: 1,
  },
  deleteBtn: {
    width: 30,
    height: 30,
    mr: 1,
  },
};

const Note = () => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const localChangeRef = useRef(false);
  const pasteOperationRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const noteId = location.pathname.slice(1);

  const getData = async () => {
    const response = await api.get(`/api/note/${noteId}`);
    setContent(response.data.content);
    setTitle(response.data.heading);
  };

  const handleDeleteNote = async () => {
    if (
      !noteId ||
      !window.confirm("Are you sure you want to delete this note?")
    )
      return;

    try {
      const response = await api.delete(`${baseURL}/api/note/${noteId}`);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handlePasteData = async () => {
    const response = await api.get(`/api/note/${noteId}`);
    pasteOperationRef.current = true;
    const clipboardText = await navigator.clipboard.readText();
    const updatedContent = response.data.content + "\n" + clipboardText;
    setContent(updatedContent);
  };

  useEffect(() => {
    if (noteId) {
      socket.emit("join-note", noteId);
    }
  }, [noteId]);

  useEffect(() => {
    if (localChangeRef.current) {
      localChangeRef.current = false;
      socket.emit("note-update", {
        noteId: noteId,
        heading: title,
        content: content,
      });
    }
  }, [title, noteId]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (socket.connected) {
      socket.on("connect", () => {
        setIsConnected(true);
        console.log("Connected to server", socket.id);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
        console.log("Disconnected from server", socket);
      });

      socket.on("note-updated", (data) => {
        if (data.heading !== title) {
          setTitle(data.heading);
        }
        if (data.content !== content) {
          setContent(data.content);
        }
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("note-updated");
      };
    }
  }, [socket]);

  return (
    <>
      <NavBar user={user} />
      <Grid container>
        <Container disableGutters sx={styles.headingContainer}>
          <Box sx={styles.leftSection}>
            <IconButton
              color="primary"
              onClick={() => {
                navigate("/");
              }}
              sx={styles.backBtn}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <TextField
              id="standard-basic"
              placeholder="Title"
              variant="standard"
              value={title}
              onChange={(event) => {
                localChangeRef.current = true;
                setTitle(event.target.value);
              }}
              InputProps={styles.titleTextInputBox}
            />
          </Box>
          <Box sx={styles.rightSection}>
            {isConnected ? (
              <CloudIcon fontSize="small" sx={{ color: "#107C10" }} />
            ) : (
              <CloudOffIcon fontSize="small" />
            )}
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ mx: 2 }}
            />
            <Tooltip title="Clipboard Paste" placement="top">
              <IconButton
                color="primary"
                onClick={handlePasteData}
                sx={styles.pasteBtn}
              >
                <ContentPasteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Auto Save" placement="top">
              <IconButton color="primary" disabled sx={styles.saveBtn}>
                <SaveIcon fontSize="small" disabled />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" placement="top">
              <IconButton
                color="primary"
                onClick={handleDeleteNote}
                sx={styles.deleteBtn}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
        <Container disableGutters sx={styles.mainContainer} maxWidth={false}>
          <MonacoEditor
            content={content}
            noteId={noteId}
            title={title}
            pasteOperationRef={pasteOperationRef}
          />
        </Container>
      </Grid>
    </>
  );
};

export default Note;
