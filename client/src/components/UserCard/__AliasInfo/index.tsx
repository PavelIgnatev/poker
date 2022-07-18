import React from "react";

import Select from "react-select";

import { BaseInputString } from "../../BaseInputString";

import InfoIcon from "../../../assets/icons/info.svg";
import MailIcon from "../../../assets/icons/mail.svg";
import SettingsIcon from "../../../assets/icons/settings.png";

import b_ from "b_";

interface Props {
  alias: string;
  effMu: string;
  setEffMu: (effMu: "A" | "B") => void;
  mail: string;
  setMail: (email: string) => void;
}

type Option = { value: "A" | "B"; label: string };

const effMuOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
];

const customStyles = {
  control: (provided: object) => ({
    ...provided,
    borderWidth: "1px",
    borderRadius: "10px",
    background: "#F5F8FF",
    width: "100px",
  }),
  indicatorSeparator: (provided: object) => ({
    display: "none",
  }),
};

const b = b_.with("UserCardAliasInfo");

export const UserCardAliasInfo = ({ alias, effMu, mail, setEffMu, setMail }: Props) => {
  const defaultEffMuOption = effMuOptions.find((v) => v.value === effMu) || effMuOptions[0];

  const handleEmailChange = (email: string) => {
    setMail(email);
  };

  const handleEffMuChange = (option: Option) => {
    setEffMu(option.value);
  };

  return (
    <div className={b()}>
      <div className={b("Alias")}>
        <b>Alias:</b> {alias}
      </div>
      <div className={b("Settings")}>
        <div className={b("EffMuWrapper")}>
          <b>Eff mu</b>
          <Select
            options={effMuOptions}
            defaultValue={defaultEffMuOption}
            // @ts-ignore все работает че дурной жалуется
            onChange={handleEffMuChange}
            className={b("Input", { effMu: true })}
            styles={customStyles}
          />
        </div>
        <div className={b("EmailWrapper")}>
          <div>
            <b>E-mail</b>
          </div>
          <BaseInputString
            value={mail}
            onChange={handleEmailChange}
            className={b("Input", { email: true })}
          />
        </div>
      </div>
      <div className={b("AdditionalInfo")}>
        <div className={b("AdditionalInfoLine")}>
          <div>
            <img src={InfoIcon} alt="info" />
          </div>
          <div>Here you can change the Eff mu and E-mail settings for your account</div>
        </div>
        <div className={b("AdditionalInfoLine")}>
          <div>
            <img src={MailIcon} alt="info" />
          </div>
          <div>
            Previously played tournaments that do not follow the rules of the team will be sent to
            your email every day Pocarr
          </div>
        </div>
        <div className={b("AdditionalInfoLine")}>
          <div>
            <img src={SettingsIcon} alt="info" />
          </div>
          <div>
            To change the level of your account in a particular network, contact the administrators
          </div>
        </div>
      </div>
    </div>
  );
};
