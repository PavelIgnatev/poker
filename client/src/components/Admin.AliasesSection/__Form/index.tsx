import { useStore } from "effector-react";
import { FC, FormEvent, useState } from "react";
import { TextField, Button } from "@mui/material";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { getAliasesRequest } from "../../../store/Alias";
import { postConfigRequest } from "../../../store/Config";
import { $password } from "../../../store/Password";
import { TIMEZONES } from "../../../store/Select";

import { SingleSelect } from "../../SingleSelect";

interface AliasesSectionFormProps {
  selectedLevel: number | null;
}

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "white",
      gap: '10px',
      maxWidth: "300px",
    },
    input: {
      marginBottom: "20px",
    },
    select: {
      width: "300px",
    },
    button: {
      minHeight: "50px",
      width: "300px",
    },
  })
);

export const AliasesSectionForm: FC<AliasesSectionFormProps> = ({
  selectedLevel,
}) => {
  const classes = useStyles();

  const [alias, setAlias] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [timezone, setTZone] = useState<string>("0");
  const adminPassword = useStore($password);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await postConfigRequest({
      config: {
        alias,
        level: selectedLevel ?? 16,
        password,
        timezone,
      },
      password: adminPassword,
    });

    await getAliasesRequest(selectedLevel ?? 16);

    setAlias("");
    setPassword("");
    setTZone(TIMEZONES[12].value);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        label="Alias"
        name="login"
        value={alias}
        className={classes.input}
        onChange={(e) => setAlias(e.currentTarget.value)}
        autoComplete="off"
        required
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        value={password}
        className={classes.input}
        onChange={(e) => setPassword(e.currentTarget.value)}
        autoComplete="off"
        required
        fullWidth
      />
      <SingleSelect
        className={classes.select}
        label="Timezones"
        options={TIMEZONES}
        defaultValue={TIMEZONES[12]}
        onSingleChange={(option) => setTZone(option?.value ?? "0")}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Добавить пользователя
      </Button>
    </form>
  );
};
