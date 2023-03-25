import { useStore } from "effector-react";
import { FC, useCallback, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { $password, handleChangePassword } from "../../store/Password";

import "./PasswordSection.scss";

export enum PasswordSectionType {
  ALIAS = "alias",
  ADMIN = "admin",
}

export type OnPasswordSubmit = ({
  password,
  login,
}: {
  password: string;
  login: string;
}) => void;

interface Props {
  onSubmit: OnPasswordSubmit;
  type?: PasswordSectionType;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 60px)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      borderRadius: "10px",
      background: "white",
      boxShadow: "0px 0px 8px 2px rgba(34, 60, 80, 0.2)",
    },
    input: {
      marginBottom: "20px",
      minWidth: "300px",
    },
    button: {
      minHeight: "50px",
      minWidth: "150px",
    },
  })
);

export const PasswordSection: FC<Props> = ({ onSubmit, type }) => {
  const classes = useStyles();
  const [login, setLogin] = useState(localStorage.getItem("login") ?? "");
  const password = useStore($password);

  const isAlias = type === PasswordSectionType.ALIAS || !type;

  const handleChangeLogin = useCallback((v: string) => {
    localStorage.setItem("login", v);
    setLogin(v);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      onSubmit({ password, login });
    },
    [onSubmit, password, login]
  );

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        {isAlias && (
          <TextField
            label="Alias"
            variant="outlined"
            className={classes.input}
            autoComplete="off"
            value={login}
            onChange={(e) => handleChangeLogin(e.currentTarget.value)}
          />
        )}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          autoComplete="off"
          className={classes.input}
          value={password}
          onChange={(e) => handleChangePassword(e.currentTarget.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Login
        </Button>
      </form>
    </div>
  );
};
