import Select from "react-select";
import { BaseSelectModel } from "./types";

const COLOR = "#4A72FF";
const BORDER_COLOR = "rgba(74, 114, 225, 0.25)";

export const specialSelectStyles = {
  option: (provided: object, state: any) => ({
    ...provided,
    color: state.isSelected ? "#FFFFFF" : COLOR,
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  control: (provided: object) => ({
    ...provided,
    border: `2px solid ${BORDER_COLOR} !important`,
    borderRadius: "10px",
    boxShadow: "none",
    background: "#F5F8FF",
    cursor: "pointer",
  }),
  singleValue: (provided: object) => ({
    ...provided,
    color: COLOR,
  }),
  dropdownIndicator: (provided: object) => ({
    ...provided,
    color: `${COLOR} !important`,
    paddingLeft: 0,
  }),
  input: (provided: object) => ({
    ...provided,
    color: COLOR,
  }),
};

export const BaseSelect = (props: BaseSelectModel) => {
  const { options, onChange, className, placeholder, disabled, defaultValue } = props;

  return (
    <Select
      className={className}
      isClearable={true}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      isDisabled={disabled}
      defaultValue={defaultValue}
    />
  );
};
