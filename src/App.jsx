import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Note from "./pages/note/Note";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Note />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
