import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectForm from "../components/ProjectForm";
import { ToastContainer } from "react-toastify";

describe("ProjectForm Component", () => {
  const mockSubmit = jest.fn();

  const renderComponent = (props = {}) => {
    render(
      <>
        <ProjectForm
          loading={false}
          onSubmit={mockSubmit}
          project={null}
          update={false}
          {...props}
        />
        <ToastContainer />
      </>
    );
  };

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test("renders form elements correctly", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("ID")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /description/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /manager/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  test("displays validation errors for invalid inputs", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(screen.getByText("id is required")).toBeInTheDocument();
      expect(screen.getByText("name is required")).toBeInTheDocument();
      expect(screen.getByText("description is required")).toBeInTheDocument();
      expect(screen.getByText("start date is required")).toBeInTheDocument();
      expect(screen.getByText("end date is required")).toBeInTheDocument();
      expect(screen.getByText("project manager is required")).toBeInTheDocument();
    });
  });

  test("calls onSubmit with correct values", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("ID"), { target: { value: "123" } });
    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Test Project" } });
    fireEvent.change(screen.getByRole("textbox", { name: /description/i }), {
      target: { value: "This is a test description." },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), { target: { value: "2025-01-01" } });
    fireEvent.change(screen.getByLabelText("End Date"), { target: { value: "2025-01-31" } });
    fireEvent.change(screen.getByPlaceholderText("Manager"), { target: { value: "John Doe" } });

    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() =>
      expect(mockSubmit).toHaveBeenCalledWith({
        id: "123",
        name: "Test Project",
        description: "This is a test description.",
        start_date: "2025-01-01",
        end_date: "2025-01-31",
        manager: "John Doe",
      })
    );
  });

  test("displays loading spinner when loading is true", () => {
    renderComponent({ loading: true });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("renders update button when update is true", () => {
    renderComponent({ update: true, project: { id: "1" } });

    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // Ensure project ID is displayed
  });
});
