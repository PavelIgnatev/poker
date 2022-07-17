export interface BaseInputMaskModel {
  handleChange: (value: string) => void;
  value: string;
  placeholder: string;
  className?: string;
}
