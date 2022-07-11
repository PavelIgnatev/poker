import { SingleValue } from "react-select";

export interface BaseSelectModel {
  options: { value: string; label: string }[];
  onChange: (newValue: SingleValue<{ value: string; label: string }>) => void;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: { value: string; label: string } | null;
}
