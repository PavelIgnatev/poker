import Select from "react-select";
import { BaseSelectModel } from "./types";
import classes from "./BaseSelectMulti.module.scss";

export const BaseSelectMulti = (props: BaseSelectModel) => {
  const { options, onChange, className, placeholder, children } = props;

  return (
    <div className={classes.wrapper}>
      <label htmlFor={placeholder} className={classes.label}>
        {children}
      </label>
      <Select
        id={placeholder}
        className={className}
        isMulti
        isClearable={true}
        options={options}
        onChange={onChange}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        controlShouldRenderValue={false}
        placeholder={placeholder}
      />
    </div>
  );
};
