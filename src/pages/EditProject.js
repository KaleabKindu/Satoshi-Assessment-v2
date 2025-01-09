import React, { useCallback } from "react";
import { withRootLayout } from "../hoc/withRootLayout";
import ProjectForm from "../components/ProjectForm";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectById, useUpdateProjectById } from "../hooks/api";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading } = useGetProjectById(id);
  const { mutateAsync, isLoading: updating } = useUpdateProjectById(id);
  const handleUpdate = useCallback(
    async (project) => {
      try {
        await mutateAsync({ ...project });
        navigate("/projects");
      } catch (error) {
        console.log("error", error);
        toast.error(error.message);
      }
    },
    [id]
  );
  return (
    <>
      {isLoading ? (
        // Show loading spinner while data is being fetched
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ProjectForm
          project={project}
          loading={updating}
          onSubmit={handleUpdate}
          update
        />
      )}
    </>
  );
};

export default withRootLayout(EditProject);
