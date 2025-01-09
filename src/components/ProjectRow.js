import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { IconButton } from "@mui/material";
import { useUpdateFavouriteProjectById } from "../hooks/api";
import FavoriteColor from "../../public/favorite-color.png";
import FavoriteOutline from "../../public/favorite-outline.png";
import CircularProgress from "@mui/material/CircularProgress";
import { columns } from "../data";

const ProjectRow = ({ project }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [favourite, setFavourite] = useState(project.favourite);
  const { mutate, isLoading: updating } = useUpdateFavouriteProjectById();
  const handleFavouriteClick = (e) => {
    e.stopPropagation()
    mutate(
      { projectId: project.id, favourite: !favourite },
      {
        onSuccess: () => setFavourite(!favourite),
        onError: () => console.log("error", error),
      }
    );
  };
  return (
    <TableRow
      hover
      key={project.id}
      
      onClick={() => navigate(`/project/${project.id}`)}
      sx={{ cursor:"pointer", backgroundColor: "rgb(241, 241, 241)" }}
    >
      {columns.map((column) => {
        const value = project[column.id];
        return (
          value && (
            <TableCell
              key={column.id}
              align={column.align}
              sx={{ paddingY: "10px", borderBottom: "none" }}
            >
              {value}
            </TableCell>
          )
        );
      })}
      <TableCell
        key="action"
        align="center"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems:"center",
          paddingY: "10px",
          borderBottom: "none",
        }}
      >
        <IconButton onClick={handleFavouriteClick}>
          {updating ? (
            <CircularProgress size={25} />
          ) : (
            <img
              width={30}
              height={30}
              src={favourite ? FavoriteColor : FavoriteOutline}
              alt="Favourite"
            />
          )}
        </IconButton>

        <Button
          className="bg-blue-500"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/project/${project.id}/edit`)
        }}
          sx={{
            borderRadius: "0px",
            backgroundColor: "rgb(59 130 246)",
            color: "white",
            height: "35px"
          }}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
