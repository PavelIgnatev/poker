import React from "react";
import { TextField } from "@material-ui/core";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
  max?: number;
}

export const NumberInput = ({
  value,
  onChange,
  label,
  className,
  max = 10000,
}: NumberInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);

    if (!isNaN(newValue) && newValue >= 0 && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      type="number"
      className={className}
      label={label?.toUpperCase()}
      value={value}
      onChange={handleChange}
      inputProps={{ min: 0, max }}
    />
  );
};
