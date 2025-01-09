import React from "react";
import { withRootLayout } from "../hoc/withRootLayout";
import ProjectsList from "../components/ProjectsList";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Projects = () => {
  return (
    <div className="flex flex-col items-end gap-5 w-full">
      <Link to="/projects/new">
        <Button
          className="bg-blue-500"
          sx={{
            paddingY: "0.5rem",
            paddingX: "2rem",
            borderRadius: "0px",
            backgroundColor: "rgb(59 130 246)",
            color: "white",
          }}
        >
          Create Project
        </Button>
      </Link>
      <ProjectsList />
    </div>
  );
};

export default withRootLayout(Projects);
