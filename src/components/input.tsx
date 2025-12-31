import { ComponentProps } from "react";
import { TextField } from "@mui/material";

export type InputProps = ComponentProps<typeof TextField> & {
  label: string;
};

export const Input = ({ ...props }: InputProps) => {
  return (
    <label className="block">
      <TextField
        type="text"
        variant="outlined"
        className="mt-1 block w-full rounded-lg"
        {...props}
      />
    </label>
  );
};
