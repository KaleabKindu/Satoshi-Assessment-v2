import React, { useCallback } from "react";
import { withRootLayout } from "../hoc/withRootLayout";
import ProjectForm from "../components/ProjectForm";
import { useCreateProject } from "../hooks/api";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading: creating } = useCreateProject();
  const handleCreate = useCallback(async (project) => {
    try {
      await mutateAsync({ ...project });
      navigate("/projects");
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  return <ProjectForm loading={creating} onSubmit={handleCreate} />;
};

export default withRootLayout(AddProject);
