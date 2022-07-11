export interface BaseInputModel {
    handleChange: (v: number) => void;
    value: number;
    max: number;
    min?: number;
    placeholder: string;
    className?: string;
}