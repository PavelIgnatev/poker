import { useStore } from "effector-react";
import { FC, FormEvent, useState } from "react";
import { getAliasesRequest } from "../../../store/Alias";
import { postConfigRequest } from "../../../store/Config";
import { $password } from "../../../store/Password";
import { EFFMU } from "../../../store/Select";
import { BaseSelect } from "../../BaseSelect";

interface AliasesSectionFormProps {
  selectedLevel: number | null;
}

import { b } from "../index";

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
      <input
        value={alias}
        onChange={(e) => setAlias(e.currentTarget.value)}
        placeholder="Alias"
        className={b("alias-form-input")}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="Password"
        className={b("alias-form-input")}
      />
      <input
        value={mail}
        onChange={(e) => setMail(e.currentTarget.value)}
        placeholder="E-mail"
        className={b("alias-form-input")}
      />
      <BaseSelect
        placeholder="Effmu"
        options={EFFMU}
        onChange={(e) => setEffmu((e?.value as "A" | "B") ?? "A")}
        className={b("alias-form-select")}
        defaultValue={EFFMU[0]}
      />
      <button className={b("alias-form-button")} type="submit">
        Add
      </button>
    </form>
  );
};
