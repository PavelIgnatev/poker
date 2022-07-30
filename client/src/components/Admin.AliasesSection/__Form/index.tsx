import { useStore } from "effector-react";
import { FC, FormEvent, useState } from "react";
import Select from "react-select";

import { getAliasesRequest } from "../../../store/Alias";
import { postConfigRequest } from "../../../store/Config";
import { $password } from "../../../store/Password";
import { EFFMU } from "../../../store/Select";
import { specialSelectStyles } from "../../BaseSelect";
import { BaseInputString } from "../../BaseInputString";

interface AliasesSectionFormProps {
  selectedLevel: number | null;
}

import { b } from "../index";
import { SelectOption } from "../../../@types/selectsModel";
import { Effmu } from "../../../@types/common";

const selectStyles = {
  ...specialSelectStyles,
  control: (provided: object) => ({
    ...specialSelectStyles.control(provided),
    fontWeight: 700,
    fontSize: "20px",
    width: "90px",
  }),
};

export const AliasesSectionForm: FC<AliasesSectionFormProps> = ({ selectedLevel }) => {
  const [alias, setAlias] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [effmu, setEffmu] = useState<"A" | "B">("A");
  const adminPassword = useStore($password);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postConfigRequest({
      config: {
        alias,
        level: selectedLevel ?? 16,
        effmu,
        mail,
        password,
      },
      password: adminPassword,
    });
    await getAliasesRequest(selectedLevel ?? 16);
    setAlias("");
    setMail("");
    setPassword("");
    setEffmu("A");
  };

  return (
    <form onSubmit={handleSubmit} className={b("alias-form")}>
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
        options={EFFMU}
        placeholder="Effmu"
        defaultValue={EFFMU[0]}
        // @ts-ignore react-select конечно молодец, но типы и стили ужасны
        onChange={(option: SelectOption<Effmu>) => setEffmu(option.value)}
        styles={selectStyles}
      />
      <button className={b("alias-form-button")} type="submit">
        Add
      </button>
    </form>
  );
};
