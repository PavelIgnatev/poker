export interface BaseInputModel {
  handleChange: (v: number) => void;
  value: number | string | null;
  max: number;
  min?: number;
  placeholder: string;
  className?: string;
}
