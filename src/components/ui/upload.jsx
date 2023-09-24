import { useCallback, useEffect, useState } from "react"; // Import necessary hooks from React
import { useDropzone } from "react-dropzone"; // Import the useDropzone hook for handling file drops
import axios from "axios"; // Import axios for making HTTP requests
import toast from "react-hot-toast"; // Import the toast notification library for displaying messages

import { cn } from "../../lib/utils"; // Import the "cn" utility function for CSS class names
import { buttonVariants } from "./button"; // Import the "buttonVariants" function for styling buttons
import { Label } from "./label"; // Import the "Label" component for rendering labels
import { Icons } from "../icons"; // Import the "Icons" component for rendering icons

// MultiUpload component takes props including a callback for uploading, default values, and a label
const MultiUpload = ({ onUpload, defaultValues, label }) => {
  // State to manage previous and current uploaded files, and loading indicator
  const [previousFiles, setPreviousFiles] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // When defaultValues prop changes, update previousFiles
  useEffect(() => {
    setPreviousFiles(defaultValues);
  }, [defaultValues]);

  // When previousFiles change detected, the onUpload callback is invoked
  useEffect(() => {
    onUpload(previousFiles);
  }, [previousFiles]);

  // Callback function to handle file drop
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const formData = new FormData();

      // Append each accepted file to formData
      acceptedFiles.forEach((image, i) => {
        formData.append("file", image);
      });

      setIsLoading(true); // Set loading indicator to true

      try {
        // Send a POST request to the server to upload files
        const res = await axios.post(
          import.meta.env.VITE_API_BASE_URL + "/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Uploaded"); // Display success message
        setPreviousFiles(res.data.files); // Update previousFiles with uploaded files
      } catch (error) {
        toast.error("Only STL files will be uploaded!"); // Display error message
      } finally {
        setIsLoading(false); // Set loading indicator to false after the request is complete
      }
    },
    []
  );

  // Initialize the Dropzone functionality
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // Allow only a single file to be uploaded
  });

  return (
    <div>
      <section>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />

          <div className="flex gap-2 items-center mb-2">
            <button
              type="button"
              onClick={() => onUpload(previousFiles)}
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "h-fit py-1"
              )}
            >
              <Icons.add className="h-4 w-4 mr-2" />
              Add File
            </button>
            {/* Render the label for the upload */}
            <Label htmlFor={""} label={label || "Upload"} />
            {/* Button to trigger file upload */}
          </div>
        </div>
      </section>
      <div className="border p-4 border-dashed rounded-md">
        <div>
          {!previousFiles ? (
            // Display a message if no files are uploaded
            <p className="text-sm">
              {isLoading && (
                <Icons.spinner className="inline animate-spin mr-2" />
              )}
              No file uploaded
            </p>
          ) : (
            // Display the list of uploaded files
            <p className="text-sm">{previousFiles}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Export the MultiUpload component as "Upload"
export { MultiUpload as Upload };
