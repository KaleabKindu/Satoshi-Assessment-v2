import React from "react";
import { useGetFavouriteProjects } from "../hooks/api";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const FavoriteProjects = () => {
  const { data: projects,isLoading } = useGetFavouriteProjects();
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold">Favorite Projects</p>
      {isLoading ? (
        // Show loading spinner while data is being fetched
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            alignItems: "center",
            height: "10vh",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ul className="flex flex-col gap-1 pl-2">
          {projects?.map((project) => (
            <li key={project.id} className="list-disc list-inside">
              <Link to={`/project/${project.id}`}>
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteProjects;
