import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";
import { Upload } from "./ui/upload";
import { cn } from "../lib/utils";
import { FormWrapper } from "./form-wrapper";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { materials } from "../constants/data";

export function PrintingForm() {
  // Initialize form control using react-hook-form
  const form = useForm({});
  const [file, setFile] = useState(""); // State to store the uploaded file
  const [recaptchaKey, setRecaptchaKey] = useState(""); // State to store reCAPTCHA response
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const history = useNavigate(); // React Router navigation

  // Destructuring form methods and state
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  // Handle form submission
  const onSubmit = async (data) => {
    if (!file) {
      // Display an error toast if no file is uploaded
      toast.error("No file added yet");
      return;
    }

    // Verify the reCAPTCHA response before proceeding
    const result = await axios
      .post(import.meta.env.VITE_API_BASE_URL + "/api/verify", {
        token: recaptchaKey,
      })
      .catch(() => toast.error("Captcha verification failed"));

    if (result.data.status) {
      setIsLoading(true); // Set loading state while processing the request

      // Make an API request to calculate printing cost and redirect to the result page
      return await axios
        .post(import.meta.env.VITE_API_BASE_URL + "/api/calculate", {
          ...data,
          file,
        })
        .then((res) => {
          const result = res.data;

          // Redirect to the result page with query parameters
          history(
            `/result?name=${result.name}&email=${data.email}&density=${data.density}&mass=${result.stl.weight}&height=${result?.stl?.boundingBox[2]}&boundingBox=${result.stl.boundingBox}&volume=${result.stl.volume}`
          );
        })
        .finally(() => setIsLoading(false)); // Clear loading state after the request
    }
  };

  // Handle file upload
  const onUpload = async (data) => {
    setFile(data); // Set the uploaded file
  };

  // Form component
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[350px] min-w-[200px]">
      <div className="grid gap-2">
        <FormWrapper>
          {/* File upload component */}
          <Upload onUpload={onUpload} label="Upload your STL file here" />
        </FormWrapper>

        <FormWrapper>
          {/* Input field for name */}
          <Label htmlFor="name" label="Name" />
          <Input
            id="name"
            className={cn(errors.name && "border-destructive")}
            type="text"
            placeholder="Full Name"
            autoCorrect="off"
            {...register("name", {
              required: {
                value: true,
                message: "Required",
              },
            })}
          />

          {/* Input field for email */}
          <Label htmlFor="email" label="Email Address" />
          <Input
            id="email"
            className={cn(errors.email && "border-destructive")}
            type="email" // Use type="email" for email input
            placeholder="Email Address"
            autoCorrect="off"
            {...register("email", {
              required: {
                value: true,
                message: "Required",
              },
            })}
          />

          {/* Display error message for email validation */}
          {errors.email && (
            <span className="text-destructive">{errors.email.message}</span>
          )}
        </FormWrapper>

        <FormWrapper>
          {/* Dropdown selection for material density */}
          <Label htmlFor={"density"} label={"Material"} />
          <Controller
            name="density"
            control={control}
            rules={{ required: { value: true, message: "Required" } }}
            render={({ field }) => {
              return (
                <Select
                  defaultValue={""}
                  className={cn(errors.name && "border-destructive")}
                  onValueChange={field.onChange}
                  data={materials}
                />
              );
            }}
          />
        </FormWrapper>

        <FormWrapper>
          {/* reCAPTCHA component for verifying human interaction */}
          <ReCAPTCHA
            sitekey="6LeDCw8oAAAAAHQUbfe1wa93F7FQBROZ6LhrMPDW"
            onChange={(value) => setRecaptchaKey(value)}
          />
        </FormWrapper>

        {/* Submit button */}
        <button
          disabled={isLoading}
          className={cn(
            buttonVariants({}),
            "mt-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
          )}
        >
          {/* Display loading spinner when isLoading is true */}
          <Icons.spinner
            className={cn("mr-2 hidden", isLoading && "block animate-spin")}
          />
          Submit
        </button>
      </div>
    </form>
  );
}
