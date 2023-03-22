import { FC, useEffect, useMemo, useState } from "react";
import Select from "react-select";

import { SelectOption } from "../../../@types/selectsModel";
import { ConfigModel } from "../../../@types/configModel";
import InfoIcon from "../../../assets/icons/info.svg";
import MailIcon from "../../../assets/icons/mail.svg";
import SettingsIcon from "../../../assets/icons/settings.png";
import EyeIcon from "../../../assets/icons/eye.svg";
import { editableConfigEvents } from "../../../store/Config";
import {
  editableTournamentsSettings,
  TIMEZONES,
  EFFMU,
  ADDRESS,
} from "../../../store/Select";

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

const LevelInfo = {
  0: { A: "$0-$400", B: "$401-$800", C: "$801+" },
  1: { A: "$0-$1k", B: "$1001-$2k", C: "$2001+" },
  2: { A: "$0-$1.5k", B: "$1501-$3k", C: "$3001+" },
  3: {
    A: "$0-$2.5k",
    B: "$2501-$5k",
    C: "$5001+",
  },
  4: {
    A: "$0-$4k",
    B: "$4001-$8k",
    C: "$8001+",
  },
  5: {
    A: "$0-$5k",
    B: "$5001-$10k",
    C: "$10001+",
  },
  6: {
    A: "$0-$7k",
    B: "$7001-$14k",
    C: "$14001+",
  },
  7: { A: "$0-$7.5k", B: "$7501-$15k", C: "$15001+" },
  8: { A: "$0-$8k", B: "$8001-$16k", C: "$16001+" },
  9: {
    A: "$0-$10k",
    B: "$10001-$20k",
    C: "$20001+",
  },
  10: {
    A: "$0-$12.5k",
    B: "$12501-$25k",
    C: "$25001+",
  },
  11: {
    A: "$0-$15k",
    B: "$15001-$30k",
    C: "$30001+",
  },
  12: { A: "$0-$20k", B: "$20001-$40k", C: "$40001+" },
  13: { A: "$0-$25k", B: "$25001-$50k", C: "$50001+" },
  14: { A: "$0-$30k", B: "$30001-$60k", C: "$60001+" },
  15: { A: "No Stips", B: "No Stips", C: "No Stips" },
  16: { A: "No Stips", B: "No Stips", C: "No Stips" },
};

const ColorsInfo: Record<ColorsType, string> = {
  green: "Good",
  yellow: "Normal, you can play",
  red: "You can play, but difficult",
  "rgb(152, 183, 201)": "You can play, but there is no information",
};

export const UserSettingsInfo: FC<Props> = ({ config, isAdminPage }) => {
  const { alias, mail, password, timezone, networks, address } = config;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((p) => !p);

  const defaultTimezoneOption =
    TIMEZONES.find((option) => option.value === timezone) || TIMEZONES[0];

  const defaultAdressOption =
    ADDRESS.find((option) => option.value === address) || ADDRESS[0];

  const handleEmailChange = (email: string) =>
    editableConfigEvents.handleChangeMail(email);
  const handlePasswordChange = (password: string) =>
    editableConfigEvents.handleChangePassword(password);
  const handleTimezoneChange = (option: SelectOption<typeof TIMEZONES[0]>) =>
    editableConfigEvents.handleTimezoneChange(option.value);
  const handleAdressChange = (option: SelectOption<typeof ADDRESS[0]>) =>
    editableConfigEvents.handleAdressChange(option.value);
  const handleAllEffmuChange = (option: SelectOption<typeof EFFMU[0]>) =>
    editableConfigEvents.handleChangeEffmuAll(option.value);

  const whichAccount = isAdminPage ? "this" : "your";

  const levels = useMemo(() => {
    const levels = Object.keys(networks).map(
      (network) => networks[network].level
    );

    return levels
      .filter(function (item, level) {
        return levels.indexOf(item) === level;
      })
      .slice(0, 3);
  }, [networks]) as Array<keyof typeof LevelInfo>;

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
          <div className={b("effmu-wrapper")}>
            <b className={b("label")}>Effmu All</b>
            <Select
              options={EFFMU}
              // @ts-ignore
              onChange={handleAllEffmuChange}
              className={b("input", { effmu: true })}
              styles={nativeSelectStyles}
              placeholder="Effmu all"
            />
          </div>
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
          <div className={b("address-wrapper")}>
            <b className={b("label")}>Adress</b>
            <Select
              options={ADDRESS}
              defaultValue={defaultAdressOption}
              // @ts-ignore
              onChange={handleAdressChange}
              className={b("input", { timezone: true })}
              styles={nativeSelectStyles}
            />
          </div>
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
        {levels.map((level) => (
          <div key={level}>
            <b className={b("label", { content: true })}>Level {level}:</b>
            <div className={b("effmu", { type: "a" })}>
              A {LevelInfo?.[level]?.["A"]}
            </div>
            <div className={b("effmu", { type: "b" })}>
              B {LevelInfo?.[level]?.["B"]}
            </div>
            <div className={b("effmu", { type: "c" })}>
              C {LevelInfo?.[level]?.["C"]}
            </div>
          </div>
        ))}
      </div>
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
