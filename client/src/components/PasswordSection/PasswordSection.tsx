import { useStore } from "effector-react";
import { FC } from "react";
import { $password, handleChangePassword } from "../../store/Password";
import { BaseInputString } from "../BaseInputString";
import classes from "./PasswordSection.module.scss";

interface Props {
  onSubmit: () => void;
}

export const PasswordSection: FC<Props> = ({ onSubmit }) => {
  const password = useStore($password);

  return (
    <section className={classes.password}>
      <h1 style={{ textAlign: "center" }}>Enter password</h1>
      <BaseInputString className={classes.input} value={password} onChange={handleChangePassword} />
      <button className={classes.button} onClick={onSubmit}>
        Send
      </button>
    </section>
  );
};
