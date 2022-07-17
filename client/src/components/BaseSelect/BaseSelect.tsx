import Select from 'react-select';
import { BaseSelectModel } from './types';

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
