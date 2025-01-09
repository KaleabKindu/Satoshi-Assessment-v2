import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ProjectDetail = ({ project }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
        <p className="font-semibold w-36 lg:text-right shrink-0">Project ID</p>
        <p>{project.id}</p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
        <p className="font-semibold w-36 lg:text-right shrink-0">
          Project Name
        </p>
        <p>{project.name}</p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap columns-2 items-center gap-4">
        <p className="font-semibold w-36 lg:text-right shrink-0">Description</p>
        <p className=" break-all">{project.description}</p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
        <p className="font-semibold w-36 lg:text-right shrink-0">Start Date</p>
        <p>{project.start_date}</p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
        <p className="font-semibold w-36 lg:text-right shrink-0">End Date</p>
        <p>{project.end_date}</p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
        <p className="font-semibold w-36 lg:text-right shrink-0">
          Project Manager
        </p>
        <p>{project.manager}</p>
      </div>
      <div className="flex gap-3 lg:ml-24 mt-10">
        <Link to="/projects">
          <Button
            className="bg-blue-500"
            sx={{
              width: "100px",
              paddingY: "4px",
              borderRadius: "0px",
              backgroundColor: "rgb(59 130 246)",
              color: "white",
            }}
          >
            Back
          </Button>
        </Link>
        <Link to={`/project/${project.id}/edit`}>
          <Button
            className="bg-blue-500"
            sx={{
              width: "100px",
              paddingY: "4px",
              borderRadius: "0px",
              backgroundColor: "rgb(59 130 246)",
              color: "white",
            }}
          >
            Update
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetail;
