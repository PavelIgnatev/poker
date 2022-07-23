import { FC } from "react";
import Select from "react-select";

import { Effmu } from "../../../@types/common";
import { SelectOption } from "../../../@types/selectsModel";
import { ConfigModel } from "../../../@types/configModel";
import InfoIcon from "../../../assets/icons/info.svg";
import MailIcon from "../../../assets/icons/mail.svg";
import SettingsIcon from "../../../assets/icons/settings.png";
import { editableConfigEvents } from "../../../store/Config";

import { specialSelectStyles } from "../../BaseSelect";
import { BaseInputString } from "../../BaseInputString";

import b_ from "b_";

interface Props {
  config: ConfigModel;
  isAdminPage?: boolean;
}

const effMuOptions: SelectOption<Effmu>[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
];

const selectStyles = {
  ...specialSelectStyles,
  control: (provided: object) => ({
    ...specialSelectStyles.control(provided),
    fontWeight: 700,
    fontSize: "22px",
    width: "90px",
  }),
};

const b = b_.with("user-settings-info");

export const UserSettingsInfo: FC<Props> = ({ config, isAdminPage }) => {
  const { effmu, alias, mail, password } = config;

  const defaultEffMuOption =
    effMuOptions.find((option) => option.value === effmu) || effMuOptions[0];

  const handleEmailChange = (email: string) => editableConfigEvents.handleChangeMail(email);
  const handlePasswordChange = (password: string) =>
    editableConfigEvents.handleChangePassword(password);
  const handleEffMuChange = (option: SelectOption<Effmu>) =>
    editableConfigEvents.handleChangeEffmu(option.value);

  const whichAccount = isAdminPage ? "this" : "your";

  return (
    <div className={b()}>
      <div className={b("alias")}>
        <b>Alias:</b> {alias}
      </div>
      <div className={b("settings")}>
        <div className={b("effmu-wrapper")}>
          <b>Eff mu</b>
          <Select
            options={effMuOptions}
            defaultValue={defaultEffMuOption}
            // @ts-ignore все работает че дурной жалуется
            onChange={handleEffMuChange}
            className={b("input", { effmu: true })}
            styles={selectStyles}
          />
        </div>
        <div className={b("email-wrapper")}>
          <b>E-mail</b>
          <BaseInputString
            value={mail}
            onChange={handleEmailChange}
            className={b("input", { text: true })}
          />
        </div>
      </div>
      <div className={b("password-wrapper")}>
        <b>Password</b>
        <BaseInputString
          value={password}
          onChange={handlePasswordChange}
          className={b("input", { text: true })}
          disabled={!isAdminPage}
        />
      </div>
      <div className={b("additional-info")}>
        <div className={b("additional-info-line")}>
          <img src={InfoIcon} alt="info" />
          Here you can change the Eff mu and E-mail for {whichAccount} account
        </div>
        <div className={b("additional-info-line")}>
          <img src={MailIcon} alt="mail" />
          Previously played tournaments that do not comply with the team's rules will be sent to
          {whichAccount} email every day
        </div>
        {!isAdminPage && (
          <div className={b("additional-info-line")}>
            <img src={SettingsIcon} alt="levels" />
            To change the level of {whichAccount} account on a particular network, contact the
            administrators
          </div>
        )}
      </div>
    </div>
  );
};
