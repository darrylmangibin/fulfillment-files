import { ComponentProps } from "react";

export type InputProps = ComponentProps<"input"> & {
  error?: string;
  label: string;
};

export const Input = ({ ...props }: InputProps) => {
  return (
    <label className="block">
      <span className="text-sm text-gray-300">{props.label}</span>
      <input
        type="text"
        className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 text-white px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...props}
      />
      {props.error && (
        <p className="text-xs text-red-500 mt-1">{props.error}</p>
      )}
    </label>
  );
};
