import { useMutation, useQuery, useQueryClient } from "react-query";
const baseURL = "http://localhost:3000/api";


export const useGetProjects = () =>
  useQuery("projects", () =>
    fetch(`${baseURL}/projects`).then((res) => res.json())
  );

export const useGetProjectById = (projectId) => {
  return useQuery(
    ["project", projectId],
    () => fetch(`${baseURL}/project/${projectId}`).then((res) => res.json()),
    {
      enabled: !!projectId,
    }
  );
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (project) =>
      fetch(`${baseURL}/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );
};

export const useUpdateProjectById = (projectId) => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedProject) =>
      fetch(`${baseURL}/project/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["project", projectId]); // Invalidate the specific project
        queryClient.invalidateQueries("projects"); // Optionally, invalidate the list of projects
      },
    }
  );
};

export const useUpdateFavouriteProjectById = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (favourite) =>
      fetch(`${baseURL}/project/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favourite: favourite }),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["project", projectId]); // Invalidate the specific project
        queryClient.invalidateQueries("projects"); // Optionally, invalidate the list of projects
      },
    }
  );
};
