import { FC, useEffect, useState } from "react";
import Select from "react-select";

import { SelectOption } from "../../../@types/selectsModel";
import { ConfigModel } from "../../../@types/configModel";
import EyeIcon from "../../../assets/icons/eye.svg";
import { editableConfigEvents } from "../../../store/Config";
import { editableTournamentsSettings, TIMEZONES } from "../../../store/Select";

import { specialSelectStyles } from "../../BaseSelect";
import { BaseInputString } from "../../BaseInputString";

import b_ from "b_";

type ColorsType = "green" | "yellow" | "red" | "rgb(152, 183, 201)";
interface Props {
  config: ConfigModel;
  isAdminPage?: boolean;
}

const nativeSelectStyles = {
  ...specialSelectStyles,
  control: (provided: object, state: any) => ({
    ...specialSelectStyles.control(provided, state),
    fontWeight: 700,
    fontSize: "20px",
    width: "150px",
  }),
};

const b = b_.with("user-settings-info");

const ColorsInfo: Record<ColorsType, string> = {
  green: "Good",
  yellow: "Normal, you can play",
  red: "You can play, but difficult",
  "rgb(152, 183, 201)": "You can play, but there is no information",
};

export const UserSettingsInfo: FC<Props> = ({ config, isAdminPage }) => {
  const { alias, password, timezone } = config;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((p) => !p);

  const defaultTimezoneOption =
    TIMEZONES.find((option) => option.value === timezone) || TIMEZONES[0];
  const handlePasswordChange = (password: string) =>
    editableConfigEvents.handleChangePassword(password);
  const handleTimezoneChange = (option: SelectOption<typeof TIMEZONES[0]>) =>
    editableConfigEvents.handleTimezoneChange(option.value);

  useEffect(() => {
    editableTournamentsSettings.handleChangeTimezone(defaultTimezoneOption);
  }, [defaultTimezoneOption]);

  return (
    <div className={b()}>
      <div className={b("header")}>
        <div className={b("header-conent")}>
          <span className={b("header-alias")}>
            <b>Alias:</b> {alias}
          </span>
          {!isAdminPage && (
            <span className={b("header-password")}>
              <b>Password:</b>
              <div
                className={b("header-password-block")}
                onClick={toggleShowPassword}
              >
                <span
                  className={b("header-password-text", {
                    hidden: !showPassword,
                  })}
                >
                  {showPassword ? password : "****"}
                </span>
                <img
                  className={b("header-password-img")}
                  src={EyeIcon}
                  alt=""
                />
              </div>
            </span>
          )}
        </div>
      </div>
      <div className={b("settings")}>
        <div className={b("settings-wrapper")}>
          <div className={b("timezones-wrapper")}>
            <b className={b("label")}>Timezone</b>
            <Select
              options={TIMEZONES}
              defaultValue={defaultTimezoneOption}
              // @ts-ignore
              onChange={handleTimezoneChange}
              className={b("input", { timezone: true })}
              styles={nativeSelectStyles}
            />
          </div>
        </div>
      </div>
      {isAdminPage && (
        <div className={b("password-wrapper")}>
          <b className={b("label")}>Password</b>
          <BaseInputString
            value={password}
            onChange={handlePasswordChange}
            className={b("input", { text: true })}
            disabled={!isAdminPage}
          />
        </div>
      )}
      {Object.keys(ColorsInfo).map((color) => {
        return (
          <div key={color} className={b("color")}>
            <div className={b("circle")} style={{ backgroundColor: color }} />
            <div className={b("additional-info", { color: true })}>
              {ColorsInfo[color as ColorsType]}
            </div>
          </div>
        );
      })}
    </div>
  );
};
