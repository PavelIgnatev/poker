import { ChangeEvent } from "react";
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material";

type CheckboxProps = {
  selected: boolean;
  onChange: (selected: boolean) => void;
  label?: string;
} & Omit<MuiCheckboxProps, "checked" | "onChange">;

export const Checkbox = ({
  selected,
  onChange,
  label,
  ...rest
}: CheckboxProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <MuiCheckbox checked={selected} onChange={handleOnChange} {...rest} />
      }
      label={label}
    />
  );
};
