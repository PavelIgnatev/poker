import { useStore } from "effector-react";
import { useCallback } from "react";
import { $alias, handleChangeAlias } from "../../store/Alias";
import { getConfig } from "../../store/Config";
import { BaseButton } from "../BaseButton";
import { BaseInputString } from "../BaseInputString";
import classes from "./AliasSection.module.scss";
import eye from "../../assets/icons/eye.svg";

export const AliasSection = () => {
  const alias = useStore($alias);

  const handleSubmit = useCallback(() => {
    getConfig(alias);
  }, [alias]);

  return (
    <section className={classes.alias}>
      <form
        className={classes.content}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <span className={classes.text}>
          Enter <strong>your alias</strong> here
        </span>
        <div className={classes.wrapper}>
          <BaseInputString
            className={classes.input}
            value={alias}
            onChange={handleChangeAlias}
          />
          <BaseButton className={classes.button} onClick={handleSubmit}>
            <img src={eye} alt="eye" className={classes.eye} />
          </BaseButton>
        </div>
      </form>
    </section>
  );
};
