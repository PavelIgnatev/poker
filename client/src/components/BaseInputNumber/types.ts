export interface BaseInputNumberModel {
  handleChange: (v: string) => void;
  value: string;
  placeholder: string;
  className?: string;
  disabled?: boolean | undefined;
}
