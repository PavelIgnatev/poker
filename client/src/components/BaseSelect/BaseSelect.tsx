import Select from "react-select";
import { BaseSelectModel } from "./types";

const GRAY_BACKGROUND_COLOR = "rgb(242, 242, 242)";
const GRAY_COLOR = "rgb(124, 124, 124)";
const COLOR = "#4A72FF";
const BOX_SHADOW_100 =
  "0 0 1px 1px rgba(0, 0, 0, 0.02), 0 0.1px 0.3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2)";
const BOX_SHADOW_300 =
  "0 0 1px 1px rgba(0, 0, 0, 0.02), 0 0.4px 0.8px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2)";

export const specialSelectStyles = {
  option: (provided: object, state: any) => ({
    ...provided,
    color: state.isSelected ? "#FFFFFF" : COLOR,
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  control: (provided: object, state: any) => ({
    ...provided,
    border: `none !important`,
    borderRadius: "10px",
    boxShadow: "none",
    background: state.isDisabled ? GRAY_BACKGROUND_COLOR : "#F5F8FF",
    cursor: "pointer",
    height: "100%",
  }),
  container: (provided: any, state: any) => ({
    ...provided,
    transition: "50ms ease-out box-shadow",
    boxShadow: state.selectProps.menuIsOpen ? BOX_SHADOW_300 : BOX_SHADOW_100,
    borderRadius: "10px",
  }),
  singleValue: (provided: object, state: any) => ({
    ...provided,
    color: state.isDisabled ? GRAY_COLOR : COLOR,
  }),
  dropdownIndicator: (provided: object, state: any) => ({
    ...provided,
    color: state.isDisabled ? GRAY_COLOR : `${COLOR} !important`,
    paddingLeft: 0,
  }),
  input: (provided: object, state: any) => ({
    ...provided,
    color: state.isDisabled ? GRAY_COLOR : COLOR,
  }),
  valueContainer: (provided: object) => ({
    ...provided,
    paddingRight: 0,
  }),
  placeholder: (provided: object) => ({
    ...provided,
    color: "rgb(160, 160, 160)",
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
      id={className}
    />
  );
};
