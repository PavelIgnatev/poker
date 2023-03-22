import { useStore } from "effector-react";
import { FC, useState } from "react";
import Select from "react-select";

import { getAliasesRequest } from "../../../store/Alias";
import { postConfigRequest } from "../../../store/Config";
import { $password } from "../../../store/Password";
import { ADDRESS, TIMEZONES } from "../../../store/Select";
import { specialSelectStyles } from "../../BaseSelect";
import { BaseInputString } from "../../BaseInputString";
import { BaseButton } from "../../BaseButton";

import { b } from "../index";

interface AliasesSectionFormProps {
  selectedLevel: number | null;
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

export const AliasesSectionForm: FC<AliasesSectionFormProps> = ({
  selectedLevel,
}) => {
  const [alias, setAlias] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [timezone, setTZone] = useState<string>("0");
  const [address, setAddress] = useState<string | null>(null);
  const adminPassword = useStore($password);

  const handleSubmit = async () => {
    await postConfigRequest({
      config: {
        alias,
        level: selectedLevel ?? 16,
        mail,
        password,
        timezone,
        address,
      },
      password: adminPassword,
    });

    await getAliasesRequest(selectedLevel ?? 16);

    setAlias("");
    setMail("");
    setPassword("");
    setTZone(TIMEZONES[0].value);
    setAddress(ADDRESS[0].value);
  };

  return (
    <div className={b("alias-form")}>
      <BaseInputString
        onChange={setAlias}
        value={alias}
        placeholder="Alias"
        className={b("alias-form-input")}
      />
      <BaseInputString
        onChange={setPassword}
        value={password}
        placeholder="Password"
        className={b("alias-form-input")}
      />
      <BaseInputString
        onChange={setMail}
        value={mail}
        placeholder="Mail"
        className={b("alias-form-input")}
      />

      <Select
        options={TIMEZONES}
        placeholder="Timezones"
        defaultValue={TIMEZONES[0]}
        onChange={(option) => setTZone(option?.value ?? "0")}
        styles={nativeSelectStyles}
      />
      <BaseButton
        className={b("alias-form-button")}
        onClick={handleSubmit}
        green
      >
        Add
      </BaseButton>
    </div>
  );
};
