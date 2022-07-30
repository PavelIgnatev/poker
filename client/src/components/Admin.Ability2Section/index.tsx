import { useEffect, useState } from "react";
import classNames from "classnames";

import { Rules } from "./Rules";

import classes from "./Rules/Rules.module.scss";
import { useStore } from "effector-react";
import { $prevSettings, $state, fetchSettings, fetchStateAbility2 } from "../../store/Settings";

// поработать над неймингом если есть желание
type State = any;
type PrevState = {
  [key: string]:
    | {
        network: string;
        level: string;
        currency: string;
        bid: string;
        status: string;
        name: string;
        ability: string;
      }[]
    | null;
};

export const Ability2Section = () => {
  // @ts-ignore блять пиздец нахуй блять что тут с типами и неймингом
  const prevState = useStore($prevSettings) as PrevState;
  const state = useStore($state) as State;

  useEffect(() => {
    fetchStateAbility2();
    fetchSettings();
  }, []);

  const [count, setCount] = useState<Record<string, number>>({});
  const levels = Array(15)
    .fill(null)
    .map((e, i) => String(i + 1));
  const EffMu = ["A", "B"];

  return (
    <section className={classes.pager}>
      <h1 style={{ textAlign: "center" }}>Rules for levels</h1>
      {levels.map((level) => {
        return (
          <div className={classes.wrapper} key={level}>
            <input type="checkbox" id={level} className={classes.hide} />
            <label htmlFor={level}>Rules for level {level}</label>
            <div>
              {EffMu.map((id) => (
                <div className={classes.effmu} key={level + id}>
                  <input type="checkbox" id={level + id} className={classes.hide} />
                  <label htmlFor={level + id}>Rules for Eff.mu - {id}</label>
                  <div>
                    {(prevState?.[level + id] ?? [])
                      .concat(Array(count[level + id] ?? 0).fill(null))
                      .map((e) => {
                        return (
                          <Rules
                            key={String(Math.random()).substr(2, 12)}
                            state={state}
                            prevState={e}
                            level={level + id}
                            minus={() => {
                              const newState: Record<string, number> = {};
                              newState[level + id] = 0;

                              setCount({
                                ...count,
                                ...newState,
                              });
                            }}
                          />
                        );
                      })}
                    <button
                      onClick={() => {
                        const newState: Record<string, number> = {};
                        newState[level + id] = 1;

                        setCount({
                          ...count,
                          ...newState,
                        });
                      }}
                      disabled={count[level + id] === 1}
                      className={classNames(classes.button, classes.maxButton)}
                    >
                      Add new rules
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};
