export interface BaseInputModel {
  handleChange: (v: number) => void;
  value: number | string;
  max: number;
  min?: number;
  placeholder: string;
  className?: string;
}
