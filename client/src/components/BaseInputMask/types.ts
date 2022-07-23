export interface BaseInputMaskModel {
  handleChange: (value: string) => void;
  value: string | null;
  placeholder: string;
  className?: string;
}
