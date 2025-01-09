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
      <Route path="/projects/new" element={<AddProject />} />
      <Route path="/project/:id" element={<Project />} />
      <Route path="/project/:id/edit" element={<EditProject />} />
    </Routes>
  );
}

export default App;
