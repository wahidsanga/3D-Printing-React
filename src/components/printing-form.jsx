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
  const form = useForm({});
  const [file, setFile] = useState("");
  const [recaptchaKey, setRecaptchaKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  // const [isSTLUploaded, setIsSTLUploaded] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    if (!file) {
      toast.error("No file added yet");
      return;
    }

    const result = await axios
      .post(import.meta.env.VITE_API_BASE_URL + "/api/verify", {
        token: recaptchaKey,
      })
      .catch(() => toast.error("Captch verification failed"));

    if (result.data.status) {
      setIsLoading(true);
      return await axios
        .post(import.meta.env.VITE_API_BASE_URL + "/api/calculate", {
          ...data,
          file,
        })
        .then((res) => {
          const result = res.data;
          history(
            `/result?name=${result.name}&email=${data.email}&density=${data.density}&mass=${result.stl.weight}&height=${result?.stl?.boundingBox[2]}&boundingBox=${result.stl.boundingBox}&volume=${result.stl.volume}`
          );
        })
        .finally(() => setIsLoading(false));
    }
  };

  const onUpload = async (data) => {
    setFile(data);
    // setIsSTLUploaded(true);
  };
  //Formwrapper is useful for styling and structuring forms in a consistent way within the application.
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[350px] min-w-[200px]">
      <div className="grid gap-2">
        <FormWrapper>
          <Upload onUpload={onUpload} label="Upload your STL file here" />
        </FormWrapper>

        <FormWrapper>
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
          {errors.email && (
            <span className="text-destructive">{errors.email.message}</span>
          )}
        </FormWrapper>

        <FormWrapper>
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
          <ReCAPTCHA
            sitekey="6LeDCw8oAAAAAHQUbfe1wa93F7FQBROZ6LhrMPDW"
            onChange={(value) => setRecaptchaKey(value)}
          />
        </FormWrapper>

        {/* {isSTLUploaded && (
          <FormWrapper>
            <ReCAPTCHA
              sitekey="6LeDCw8oAAAAAHQUbfe1wa93F7FQBROZ6LhrMPDW"
              onChange={(value) => setRecaptchaKey(value)}
            />
          </FormWrapper>
        )} */}

        <button
          disabled={isLoading}
          className={cn(
            buttonVariants({}),
            "mt-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
          )}
        >
          <Icons.spinner
            className={cn("mr-2 hidden", isLoading && "block animate-spin")}
          />
          Submit
        </button>

        {/* <button
          disabled={!isSTLUploaded || isLoading}
          className={cn(
            buttonVariants({}),
            "mt-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
          )}
        >
          <Icons.spinner
            className={cn("mr-2 hidden", isLoading && "block animate-spin")}
          />
          Submit
        </button> */}
      </div>
    </form>
  );
}
