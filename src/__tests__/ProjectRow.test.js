import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ProjectRow from "../components/ProjectRow";

// Mock the navigate function
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

jest.mock("./ToggleFavouriteButton", () => jest.fn(() => <div>Favourite Button</div>));

describe("ProjectRow Component", () => {
  const navigate = jest.fn();
  const mockProject = {
    id: "1",
    name: "Test Project",
    description: "A test project description",
    start_date: "2025-01-01",
    end_date: "2025-01-31",
    manager: "John Doe",
    favourite: true,
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <ProjectRow project={mockProject} />
          </tbody>
        </table>
      </MemoryRouter>
    );
  };

  test("renders project data correctly", () => {
    renderComponent();

    // Check that the project data is displayed
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("A test project description")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
    expect(screen.getByText("2025-01-31")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Check that the Favourite Button is rendered
    expect(screen.getByText("Favourite Button")).toBeInTheDocument();
  });

  test("navigates to project details when row is clicked", () => {
    renderComponent();

    const tableRow = screen.getByRole("row");
    fireEvent.click(tableRow);

    expect(navigate).toHaveBeenCalledWith("/project/1");
  });

  test("navigates to edit page when Edit button is clicked", () => {
    renderComponent();

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(navigate).toHaveBeenCalledWith("/project/1/edit");
  });

  test("clicking the Edit button does not trigger row click", () => {
    renderComponent();

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    // The row's navigation should not be triggered
    expect(navigate).not.toHaveBeenCalledWith("/project/1");
  });
});
