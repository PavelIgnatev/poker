import { useStore } from "effector-react";
import { FC } from "react";
import { $password, handleChangePassword, postFetchPassword } from "../../store/Password";
import { BaseInputString } from "../BaseInputString";
import classes from "./PasswordSection.module.scss";

export const PasswordSection: FC = () => {
  const password = useStore($password);

  return (
    <section className={classes.password}>
      <h1 style={{ textAlign: "center" }}>Enter password</h1>
      <BaseInputString className={classes.input} value={password} onChange={handleChangePassword} />
      <button className={classes.button} onClick={() => postFetchPassword(password)}>
        Send
      </button>
    </section>
  );
};
