import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FavoriteProjects from "../components/FavouriteProjects";
import { useGetFavouriteProjects } from "../hooks/api";
import '@testing-library/jest-dom';

// Mock the API hook
jest.mock("../hooks/api");

const mockUseGetFavouriteProjects = useGetFavouriteProjects ;

describe("FavoriteProjects Component", () => {
  it("displays a loading spinner while data is being fetched", () => {
    // Mock the hook to return loading state
    mockUseGetFavouriteProjects.mockReturnValue({ data: null, isLoading: true });

    render(
      <MemoryRouter>
        <FavoriteProjects />
      </MemoryRouter>
    );

    // Assert the loading spinner is visible
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays a list of favorite projects when data is loaded", () => {
    // Mock the hook to return project data
    const mockProjects = [
      { id: 1, name: "Project Alpha" },
      { id: 2, name: "Project Beta" },
    ];
    mockUseGetFavouriteProjects.mockReturnValue({
      data: mockProjects,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <FavoriteProjects />
      </MemoryRouter>
    );

    // Assert that the project names are rendered
    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    expect(screen.getByText("Project Beta")).toBeInTheDocument();

    // Assert that the links are correct
    expect(screen.getByText("Project Alpha").closest("a")).toHaveAttribute(
      "href",
      "/project/1"
    );
    expect(screen.getByText("Project Beta").closest("a")).toHaveAttribute(
      "href",
      "/project/2"
    );
  });

  it("renders a message when no projects are available", () => {
    // Mock the hook to return an empty project list
    mockUseGetFavouriteProjects.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <FavoriteProjects />
      </MemoryRouter>
    );

    // Assert that no projects message is rendered
    expect(screen.getByText("Favorite Projects")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
