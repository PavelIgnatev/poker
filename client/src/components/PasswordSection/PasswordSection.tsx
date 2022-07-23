import b_ from "b_";
import { FC, useState } from "react";

import { BaseInputString } from "../BaseInputString";
import { BaseButton } from "../BaseButton";

import "./PasswordSection.scss";

export enum PasswordSectionType {
  ALIAS = "alias",
  ADMIN = "admin",
}

export type OnPasswordSubmit = ({ password, login }: { password: string; login: string }) => void;

interface Props {
  onSubmit: OnPasswordSubmit;
  type?: PasswordSectionType;
}

const b = b_.with("password-section");

export const PasswordSection: FC<Props> = ({ onSubmit, type }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const isAdmin = type === PasswordSectionType.ADMIN;
  const isAlias = type === PasswordSectionType.ALIAS || !type;

  const whosePassword = isAdmin ? "admin" : "your";

  return (
    <section className={b()}>
      <div className={b("content-wrapper")}>
        {isAlias && (
          <div className={b("input-wrapper")}>
            <span className={b("label")}>
              Enter <strong>your alias</strong> here
            </span>
            <BaseInputString className={b("input")} value={login} onChange={setLogin} />
          </div>
        )}

        <div className={b("input-wrapper")}>
          <span className={b("label")}>
            Enter <strong>{whosePassword} password</strong> here
          </span>
          <BaseInputString className={b("input")} value={password} onChange={setPassword} />
        </div>
        <BaseButton className={b("submit-button")} onClick={() => onSubmit({ password, login })}>
          Submit
        </BaseButton>
      </div>
    </section>
  );
};
