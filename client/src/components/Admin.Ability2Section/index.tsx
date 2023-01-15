import b_ from "b_";
import { useStore } from "effector-react";
import { useEffect } from "react";

import { Rule } from "../../@types/common";
import {
  $prevSettings,
  $state,
  fetchSettings,
  fetchStateAbility2,
} from "../../store/Settings";

import { LevelBlocks, useLevelBlocks } from "../LevelBlocks";

import { Ability2SectionRules } from "./__Rules";

import "./index.scss";
import { Loader } from "../Loader";

// поработать над неймингом если есть желание
type State = any;
export type SavedRules = {
  [key: string]: Rule[] | null;
};

export const b = b_.with("ability-2-section");

export const Ability2Section = () => {
  const savedRules = useStore($prevSettings);
  const state = useStore($state) as State;

  useEffect(() => {
    fetchStateAbility2();
    fetchSettings();
  }, []);

  const ability2Loading = useStore(fetchStateAbility2.pending);

  const { selectedLevel, handleLevelChange } = useLevelBlocks();

  return (
    <section className={b()}>
      <span className={b("title")}>Rules Ability 2:</span>
      <LevelBlocks
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
      />
      {selectedLevel !== null && (
        <>
          <span className={b("subtitle")}>Rules for {selectedLevel} level</span>
          {!ability2Loading ? (
            <Ability2SectionRules
              savedRules={savedRules}
              state={state}
              level={selectedLevel}
            />
          ) : (
            <div className={b("loader")}>
              <Loader />
              <span className={b("loader-title")}>
                Maximum time - 1 minute (in case the sample value is 1-3)
              </span>
            </div>
          )}
        </>
      )}
    </section>
  );
};
