import { useStore } from "effector-react";
import { Effmu } from "../../@types/common";
import classes from "./TextTier.module.scss";
import { $config } from "../../store/Config";
import "./TextTier.module.scss";

export const TextTier = () => {
  const config = useStore($config);
  const textTierOptions: Record<Effmu, string> = {
    A: "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
    B: "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
    C: "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
    all: "Alias is not defined",
  };

  return <div className={classes.div}>{textTierOptions[config?.effmu || "all"]}</div>;
};
