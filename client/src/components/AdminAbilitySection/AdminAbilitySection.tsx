import { useStore } from "effector-react";
import { FC, useEffect, useState } from "react";

import {
  $prevSettings,
  $state,
  $stateAliases,
  fetchSettings,
  fetchStateAbility2,
  fetchStateAlias,
} from "../../store/Settings";
import { AliasWrapper } from "../AliasWrapper";
import { RulesWrapper } from "../RulesWrapper";
import { PagerModel } from "../RulesWrapper/types";

import classes from "./AdminAbilitySection.module.scss";

export const AdminAbilitySection: FC = () => {
  const ability2: any = useStore($prevSettings);
  const stateAbility2 = useStore($state);
  const stateAlias = useStore($stateAliases);

  useEffect(() => {
    fetchStateAbility2();
    fetchStateAlias();
    fetchSettings();
  }, []);

  return (
    <section className={classes.section}>
      <h2>Admissible status: </h2>
      <ul>
        <li>!KONormal</li>
        <li>KONormal</li>
        <li>!KOTurbo</li>
        <li>KOTurbo</li>
        <li>
          !KOSuperTurbo <span>(only WNMX)</span>
        </li>
        <li>
          KOSuperTurbo <span>(only WNMX)</span>
        </li>
      </ul>

      <RulesWrapper state={stateAbility2} prevState={ability2} />
      <AliasWrapper prevState={stateAlias} />
    </section>
  );
};
