import { FC, useEffect, useState } from "react";
import Select from "react-select";

import { SelectOption } from "../../../@types/selectsModel";
import { ConfigModel } from "../../../@types/configModel";
import InfoIcon from "../../../assets/icons/info.svg";
import MailIcon from "../../../assets/icons/mail.svg";
import SettingsIcon from "../../../assets/icons/settings.png";
import EyeIcon from "../../../assets/icons/eye.svg";
import { editableConfigEvents } from "../../../store/Config";
import { editableTournamentsSettings, TIMEZONES } from "../../../store/Select";

import { specialSelectStyles } from "../../BaseSelect";
import { BaseInputString } from "../../BaseInputString";

import b_ from "b_";

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

export const UserSettingsInfo: FC<Props> = ({ config, isAdminPage }) => {
  const { alias, mail, password, timezone } = config;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((p) => !p);

  const defaultTimezoneOption =
    TIMEZONES.find((option) => option.value === timezone) || TIMEZONES[0];

  const handleEmailChange = (email: string) =>
    editableConfigEvents.handleChangeMail(email);
  const handlePasswordChange = (password: string) =>
    editableConfigEvents.handleChangePassword(password);
  const handleTimezoneChange = (option: SelectOption<typeof TIMEZONES[0]>) =>
    editableConfigEvents.handleTimezoneChange(option.value as any);

  const whichAccount = isAdminPage ? "this" : "your";

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
        <div className={b("email-wrapper")}>
          <b className={b("label")}>E-mail</b>
          <BaseInputString
            value={mail}
            onChange={handleEmailChange}
            className={b("input", { text: true })}
          />
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
      <div className={b("additional-info")}>
        <div className={b("additional-info-line")}>
          <img src={InfoIcon} alt="info" />
          Here you can change the Eff mu and E-mail for {whichAccount} account
        </div>
        <div className={b("additional-info-line")}>
          <img src={MailIcon} alt="mail" />
          Previously played tournaments that do not comply with the team's rules
          will be sent to
          {whichAccount} email every day
        </div>
        {!isAdminPage && (
          <div className={b("additional-info-line")}>
            <img src={SettingsIcon} alt="levels" />
            To change the level of {whichAccount} account on a particular
            network, contact the administrators
          </div>
        )}
      </div>
      <div className={b("effmu-content")}>
        <div className={b("effmu", { type: "a" })}>A ($0-$12.5k)</div>
        <div className={b("effmu", { type: "b" })}>B ($12501-$25k)</div>
        <div className={b("effmu", { type: "c" })}>C ($25001+)</div>
      </div>
    </div>
  );
};
