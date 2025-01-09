import React from "react";
import clsx from "clsx";
// Component for rendering a form label with optional error styling
export const FormLabel = ({
  className, // Additional class names for the label
  children, // Label text or elements
  error, // Boolean indicating if there is an error
}) => {
  return (
    <label
      className={clsx(
        {
          "text-red-500": error, // Apply red text color if there is an error
        },
        className
      )}
    >
      <span className="text-base font-medium">{children}</span>{" "}
      {/* Render the label text */}
    </label>
  );
};

// Component for rendering a form error message
export const FormError = ({
  children, // Error message text or elements
  show, // Boolean indicating if the error message should be shown
}) => {
  return (
    <div
      className={clsx("flex gap-2 mt-1 items-center text-red-500", {
        hidden: !show, // Hide the error message if show is false
      })}
    >
      <p className="text-sm">{children}</p>{" "}
      {/* Render the error message text */}
      <span className="opacity-0">*</span> {/* Placeholder for alignment */}
    </div>
  );
};
