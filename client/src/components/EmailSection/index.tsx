import b_ from "b_";
import { useStore } from "effector-react";
import { TextField, Button, Typography } from "@mui/material";
import validator from "email-validator";

import { $email, handleChangeEmail, postEmail } from "../../store/Email";

import "./index.scss";

export const b = b_.with("email-section");

export const EmailSection = () => {
  const email = useStore($email);

  return (
    <section className={b()}>
      <Typography
        variant="h5"
        gutterBottom
        style={{
          marginTop: "10px",
        }}
      >
        Email control 
      </Typography>
      <TextField
        variant="outlined"
        label="Email"
        autoComplete="off"
        style={{ width: "250px" }}
        value={email}
        onChange={(e) => handleChangeEmail(e.currentTarget.value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          display: "block",
          width: "250px",
          marginTop: "10px",
        }}
        onClick={() => postEmail({ email })}
        disabled={!validator.validate(email)}
      >
        Save
      </Button>
    </section>
  );
};
