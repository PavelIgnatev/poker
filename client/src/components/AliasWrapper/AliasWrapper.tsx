import { FC, useState } from 'react';
import classNames from 'classnames';

import { Alias } from './Alias';
import { LevelModel } from './types';

import classes from './Alias/Alias.module.scss';

export const AliasWrapper: FC<LevelModel> = ({ prevState }) => {
  const [count, setCount] = useState<Record<string, number>>({});
  const levels = Array(15)
    .fill(null)
    .map((e, i) => String(i + 1));
  const EffMu = ['A', 'B'];

  return (
    <div className={classes.pager}>
      <h1 style={{ textAlign: 'center' }}>Alias by levels</h1>
      {levels.map((level) => {
        return (
          <div className={classes.wrapper} key={level}>
            <input type="checkbox" id={level + 'alias'} className={classes.hide} />
            <label htmlFor={level + 'alias'}>Alias for level {level}</label>
            <div>
              {EffMu.map((id) => (
                <div className={classes.effmu} key={level + id}>
                  <input type="checkbox" id={level + id + 'alias'} className={classes.hide} />
                  <label htmlFor={level + id + 'alias'}>Alias for Eff.mu - {id}</label>
                  <div>
                    {(prevState?.[level + id] ?? [])
                      .concat(Array(count[level + id] ?? 0).fill(null))
                      .map((e) => {
                        return (
                          <Alias
                            key={String(Math.random()).substr(2, 12)}
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
                      Add new alias
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
