import React from "react";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import EditProject from "./pages/EditProject";
import Project from "./pages/Project";
import AddProject from "./pages/AddProject";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<Project />} />
      <Route path="/projects/:id/edit" element={<EditProject />} />
      <Route path="/projects/new" element={<AddProject />} />
    </Routes>
  );
}

export default App;
