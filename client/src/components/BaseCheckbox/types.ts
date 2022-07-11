export interface BaseCheckboxModel {
  checked: boolean;
  onChange: () => void;
  className?: string;
  label: string;
}
