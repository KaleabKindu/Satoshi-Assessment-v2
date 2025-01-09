import { http, delay, HttpResponse } from "msw";
import projectsData from "../data/projects.json";

const baseURL = "http://localhost:3000/api"; // or your base URL
let projects = [...projectsData]; // Create a mutable copy

export const handlers = [
  // Mock GET request
  http.get(`${baseURL}/projects`, async () => {
    await delay(1000);

    return HttpResponse.json(projects);
  }),

  http.get(`${baseURL}/project/:projectId`, async ({ params }) => {
    const { projectId } = params;
    const project = projects.find((project) => project.id === projectId);

    await delay(1000);

    // Simulate 404 error if project not found
    if (!project) {
      return HttpResponse(null, {
        status: 404,
        statusText: "Project Not Found",
      });
    }

    return HttpResponse.json(project);
  }),
  // Mock Favourite Projects GET request
  http.get(`${baseURL}/projects/favourite`, async () => {
    const favoriteProjects = projects.filter((project) => project.favourite);

    await delay(1000);

    return HttpResponse.json(favoriteProjects);
  }),

  // Mock PUT request to update a project
  http.post(`${baseURL}/project`, async ({ request }) => {
    const newProject = await request.json(); // Parse the body to get the object

    // Update the project in the data array
    projects = [...projects, { ...newProject }];

    await delay(1000);

    // Simulate 400 error if required fields are missing
    if (!newProject.name || !newProject.id) {
      return HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
        body: JSON.stringify({ message: "Name or ID is missing" }),
      });
    }

    return HttpResponse.json(newProject, { status: 201 });
  }),

  // Mock PUT request to update a project
  http.put(`${baseURL}/project/:projectId`, async ({ params, request }) => {
    const { projectId } = params;
    const updatedData = await request.json(); // Parse the body to get the object

    let updatedProject = projects.find((p) => p.id === projectId);

    // Simulate 404 if project not found
    if (!updatedProject) {
      return HttpResponse(null, {
        status: 404,
        statusText: "Project Not Found",
      });
    }
    // Update the project in the data array
    projects = projects.map((project) =>
      project.id === projectId ? { ...project, ...updatedData } : project
    );

    // Return just the updated project for consistency
    updatedProject = projects.find((p) => p.id === projectId);

    await delay(1000);

    return HttpResponse.json(updatedProject, { status: 200 });
  }),
  // Mock PUT request to update a project
  http.put(
    `${baseURL}/project/favourite/:projectId`,
    async ({ params, request }) => {
      const { projectId } = params;
      const { favourite } = await request.json(); // Parse the body to get the object

      let updatedProject = projects.find((p) => p.id === projectId);

      // Simulate 404 if project not found
      if (!updatedProject) {
        return HttpResponse(null, {
          status: 404,
          statusText: "Project Not Found",
        });
      }
      // Update the project in the data array
      projects = projects.map((project) =>
        project.id === projectId
          ? { ...project, favourite: favourite }
          : project
      );

      // Return just the updated project for consistency
      updatedProject = projects.find((p) => p.id === projectId);

      await delay(1000);

      return HttpResponse.json(updatedProject, { status: 200 });
    }
  ),
];
