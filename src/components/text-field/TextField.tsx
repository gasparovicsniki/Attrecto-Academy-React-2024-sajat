/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UseFormRegister } from "react-hook-form";
import BaseField from "../base-field/BaseField";

interface TextFieldProps {
  label: string;
  type?: string;
  className?: string;
  name: string;
  register?: UseFormRegister<any>;
  error?: string;
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

const TextField = ({
  name,
  label,
  className,
  register,
  error,
  type = "text",
  value,
  onChange,
}: TextFieldProps) => {
  return (
    <BaseField className={className} label={label} error={error}>
      <input
        type={type}
        className="form-control"
        {...(register ? register(name) : {})} 
        {...(value !== undefined ? { value, onChange } : {})} 
      />
    </BaseField>
  );
};

export default TextField;
