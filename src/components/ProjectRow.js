import React, { useMemo, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { columns } from "../data";
import ToggleFavouriteButton from "./ToggleFavouriteButton";

const ProjectRow = ({ project }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  return (
    <TableRow
      hover
      key={project.id}
      onClick={() => navigate(`/project/${project.id}`)}
      sx={{ cursor: "pointer", backgroundColor: "rgb(241, 241, 241)" }}
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
          alignItems: "center",
          paddingY: "10px",
          borderBottom: "none",
        }}
      >
        <ToggleFavouriteButton
          id={project.id}
          isFavourite={project.favourite}
        />
        <Button
          className="bg-blue-500"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/project/${project.id}/edit`);
          }}
          sx={{
            borderRadius: "0px",
            backgroundColor: "rgb(59 130 246)",
            color: "white",
            height: "35px",
          }}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
