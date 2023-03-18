import b_ from "b_";
import { FC, useMemo } from "react";
import Select from "react-select";

import { Networks } from "../../../@types/common";
import { SelectOption } from "../../../@types/selectsModel";
import { LEVELS_ARRAY } from "../../../constants";
import { editableConfigEvents } from "../../../store/Config";

import { specialSelectStyles } from "../../BaseSelect";

const selectStyles = {
  ...specialSelectStyles,
  option: (provided: object, state: any) => ({
    ...specialSelectStyles.option(provided, state),
    fontSize: "20px",
  }),
  control: (provided: object, state: any) => ({
    ...specialSelectStyles.control(provided, state),
    fontSize: "20px",
    width: "70px",
  }),
  noOptionsMessage: (provided: object) => ({
    display: "none",
  }),
};

interface Props {
  networks: Networks;
  canChangeLevels?: boolean;
}

const b = b_.with("user-settings-table");

const levelsOptions: SelectOption<number>[] = LEVELS_ARRAY.map((level) => ({
  value: level,
  label: level,
}));

export const UserSettingsTable: FC<Props> = ({ networks, canChangeLevels }) => {
  const renderContent = useMemo(
    () =>
      Object.keys(networks).map((network) => {
        const { level } = networks[network];

        const defaultOption = levelsOptions.find(
          (option) => option.value === level
        );

        const handleLevelChange = (option: SelectOption<number>) =>
          editableConfigEvents.handleChangeLevel({
            network,
            level: option.value,
          });

        return (
          <div className={b("row")} key={network}>
            <div className={b("cell")}>{network}</div>
            <div className={b("cell")}>
              {canChangeLevels ? (
                <Select
                  defaultValue={defaultOption}
                  value={defaultOption}
                  options={levelsOptions}
                  // @ts-ignore все работает
                  onChange={handleLevelChange}
                  className={b("input", { select: true })}
                  styles={selectStyles}
                />
              ) : (
                networks[network].level
              )}
            </div>
          </div>
        );
      }),
    [canChangeLevels, networks]
  );

  return (
    <div className={b({ "select-in-cells": canChangeLevels })}>
      <div className={b("row", { headline: true })}>
        <div className={b("cell")}>Network</div>
        <div className={b("cell")}>Level</div>
      </div>
      {renderContent}
    </div>
  );
};
