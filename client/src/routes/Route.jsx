import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import { Login } from "../pages/auth/login";
import Register from "../pages/auth/Register";
import ChatUI from "../pages/layout/components/ChatUi";
import ProtectedRoute from "../components/ProtectedRoute";

function Routers() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/chat/:userId" element={
            <ProtectedRoute>
              <ChatUI />
            </ProtectedRoute>
            } />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Routers;
