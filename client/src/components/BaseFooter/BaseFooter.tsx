import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    marginTop: "auto",
  },
}));

export const BaseFooter = () => {
  const classes = useStyles();

  return <></>;
};
