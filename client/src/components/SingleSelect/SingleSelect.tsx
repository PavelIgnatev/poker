import React, { useState } from "react";
import { makeStyles, createStyles, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme();

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
  })
);

interface Option {
  label: string;
  value: string;
}

interface Props extends Omit<SelectProps, "multiple"> {
  label: string;
  options: Option[];
  defaultValue: Option | null;
  onSingleChange: (v: Option | null) => void;
}

export const SingleSelect: React.FC<Props> = ({
  label,
  options,
  onSingleChange,
  defaultValue,
  ...props
}) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    defaultValue
  );

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const option = options.find(
      (option) => option.value === event.target.value
    );
    setSelectedOption(option || null);
    onSingleChange(option || null);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedOption?.value || ""}
          onChange={handleChange}
          label={label}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};
