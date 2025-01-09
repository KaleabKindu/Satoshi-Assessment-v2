import React from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { TextField } from "@mui/material";
import { FormError, FormLabel } from "./FormElements";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer } from 'react-toastify';

// Define the validation schema using Yup
const formSchema = object({
  id: string().required(),
  name: string()
    .min(3, "project name must be atleast 3 characters long")
    .required("name is required"),
  description: string().required("description is required"),
  start_date: string()
    .matches(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      "Date must be in the format YYYY-MM-DD"
    )
    .required("start date is required"),
  end_date: string()
    .matches(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      "Date must be in the format YYYY-MM-DD"
    )
    .required("end date is required"),
  manager: string().required("project manager is required"),
});

const ProjectForm = ({ loading, onSubmit, project, update }) => {
  // Initialize formik with initial values, validation schema, and submit handler
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        id: project?.id,
        name: project?.name,
        description: project?.description,
        start_date: project?.start_date,
        end_date: project?.end_date,
        manager: project?.manager,
      },
      validationSchema: formSchema,
      onSubmit: async (values) => {
        await onSubmit({ ...values });
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2 md:gap-5">
          <FormLabel className="w-36" error={touched.id && !!errors.id}>
            Project ID
          </FormLabel>
          {update ? (
            <p>{project.id}</p>
          ) : (
            <div>
              <TextField
                placeholder="ID"
                value={values.id}
                name="id"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.id && !!errors.id}
              />
              <FormError show={touched.id && !!errors.id}>
                {errors.id}
              </FormError>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-5">
          <FormLabel className="w-36" error={touched.name && !!errors.name}>
            Project Name
          </FormLabel>
          <div>
            <TextField
              placeholder="Name"
              value={values.name}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && !!errors.name}
            />
            <FormError show={touched.name && !!errors.name}>
              {errors.name}
            </FormError>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-5">
          <FormLabel
            className="flex-initial shrink-0 w-36"
            error={touched.description && !!errors.description}
          >
            Description
          </FormLabel>
          <div className="lg:flex-1 w-full">
            <TextField
              value={values.description}
              name="description"
              sx={{ maxWidth: "300px", width:"100%"}}
              multiline
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && !!errors.description}
            />
            <FormError show={touched.description && !!errors.description}>
              {errors.description}
            </FormError>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-5">
          <FormLabel
            className="w-36"
            error={touched.start_date && !!errors.start_date}
          >
            Start Date
          </FormLabel>
          <div>
            <TextField
              value={values.start_date}
              type="date"
              name="start_date"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.start_date && !!errors.start_date}
            />
            <FormError show={touched.start_date && !!errors.start_date}>
              {errors.start_date}
            </FormError>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-5">
          <FormLabel
            className="w-36"
            error={touched.end_date && !!errors.end_date}
          >
            End Date
          </FormLabel>
          <div>
            <TextField
              value={values.end_date}
              type="date"
              name="end_date"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.end_date && !!errors.end_date}
            />
            <FormError show={touched.end_date && !!errors.end_date}>
              {errors.end_date}
            </FormError>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-5">
          <FormLabel
            className="w-36"
            error={touched.manager && !!errors.manager}
          >
            Project Manager
          </FormLabel>
          <div>
            <TextField
              placeholder="Manager"
              value={values.manager}
              name="manager"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.manager && !!errors.manager}
            />
            <FormError show={touched.manager && !!errors.manager}>
              {errors.manager}
            </FormError>
          </div>
        </div>
        <Button
          type="submit"
          className="bg-blue-500"
          disabled={loading}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100px",
            paddingY: "4px",
            borderRadius: "0px",
            marginLeft: { xs: "0px", md: "10.5rem" },
            backgroundColor: "rgb(59 130 246)",
            color: "white",
          }}
        >
          {loading ? (
            <CircularProgress sx={{ color: "white" }} size={30} />
          ) : (
            `${update ? "Update" : "Create"}`
          )}
        </Button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default ProjectForm;
