import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";

interface Option {
  label: string;
  value: string;
}

interface Props
  extends Omit<AutocompleteProps<Option, true, false, false>, "renderInput"> {
  label: string;
  value: Option[];
  options: Option[];
  onMultiChange: (v: Option[]) => {};
}

export const MultiSelect: React.FC<Props> = ({
  label,
  value = [],
  options,
  onMultiChange,
  ...props
}) => {
  const handleChange = (_: React.ChangeEvent<{}>, value: Option[]) => {
    onMultiChange(value);
  };

  return (
    <div>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option.label}
        filterSelectedOptions
        value={value ?? []}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder=""
          />
        )}
        {...props}
      />
    </div>
  );
};
