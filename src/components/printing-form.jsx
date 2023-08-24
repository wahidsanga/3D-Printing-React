import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    setIsLoading(true);
    await axios
      .post(import.meta.env.VITE_API_BASE_URL + "/api/calculate", {
        ...data,
        file,
      })
      .then((res) => {
        const result = res.data;
        history(
          `/result?name=${result.name}&density=${data.density}&mass=${result.stl.weight}&height=${result?.stl?.boundingBox[2]}&boundingBox=${result.stl.boundingBox}`
        );
      })
      .finally(() => setIsLoading(false));
  };

  const onUpload = async (data) => {
    setFile(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[350px] min-w-[200px]">
      <div className="grid gap-2">
        <FormWrapper>
          <Upload onUpload={onUpload} label="Upload" />
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
      </div>
    </form>
  );
}
