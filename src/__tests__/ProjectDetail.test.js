import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectDetail from "../components/ProjectDetail";

describe("ProjectDetail Component", () => {
  const mockProject = {
    id: "1",
    name: "Test Project",
    description: "A test project description",
    start_date: "2025-01-01",
    end_date: "2025-01-31",
    manager: "John Doe",
  };

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <ProjectDetail project={mockProject} />
      </MemoryRouter>
    );
  };

  test("renders project details correctly", () => {
    renderComponent();

    // Check that all project fields are displayed
    expect(screen.getByText("Project ID")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("Project Name")).toBeInTheDocument();
    expect(screen.getByText("Test Project")).toBeInTheDocument();

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("A test project description")).toBeInTheDocument();

    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();

    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("2025-01-31")).toBeInTheDocument();

    expect(screen.getByText("Project Manager")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("renders 'Back' button with correct link", () => {
    renderComponent();

    const backButton = screen.getByRole("link", { name: /back/i });
    expect(backButton).toHaveAttribute("href", "/projects");
  });

  test("renders 'Update' button with correct link", () => {
    renderComponent();

    const updateButton = screen.getByRole("link", { name: /update/i });
    expect(updateButton).toHaveAttribute("href", "/project/1/edit");
  });
});
