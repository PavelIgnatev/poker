import { MultiValue } from "react-select";

export interface BaseSelectModel {
  options: { value: string; label: string }[];
  onChange: (newValue: MultiValue<{ value: string; label: string }>) => void;
  className: string;
  placeholder: string;
  children: string;
}
