import { useStore } from "effector-react";
import React, { FC, useEffect } from "react";

import { $prevSettings, $state, fetchSettings, fetchStateAbility2 } from "../../store/Settings";
import { RulesWrapper } from "../RulesWrapper";

import classes from "./AdminAbilitySection.module.scss";
import { AliasesSection } from "../AliasesSection";

export const AdminAbilitySection: FC = () => {
  const ability2: any = useStore($prevSettings);
  const stateAbility2 = useStore($state);

  useEffect(() => {
    fetchStateAbility2();
    fetchSettings();
  }, []);

  return (
    <>
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
        <AliasesSection />
      </section>
    </>
  );
};
