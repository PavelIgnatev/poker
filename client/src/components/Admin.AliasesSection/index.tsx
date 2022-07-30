import b_ from "b_";
import React from "react";
import cx from "classnames";

import { LEVELS_ARRAY } from "../../constants";
import { getAliasesRequest } from "../../store/Alias";

import { AliasesSectionForm } from "./__Form";
import { AliasesSectionList } from "./__List";

import "./index.scss";
import { BaseInputString } from "../BaseInputString";

export const b = b_.with("aliases-section");

const ALL_LEVELS = -1;

export const AliasesSection = () => {
  const [selectedLevel, setSelectedLevel] = React.useState<number | null>(null);
  const [search, setSearch] = React.useState<string>("");
  const isAllLevels = selectedLevel === ALL_LEVELS;

  React.useEffect(() => {
    if (isAllLevels) {
      getAliasesRequest();
    } else if (selectedLevel) {
      getAliasesRequest(selectedLevel);
    }
  }, [selectedLevel]);

  const handleLevelBlockClick = (level: number) => () => {
    if (level === selectedLevel) {
      setSelectedLevel(null);
    } else {
      setSelectedLevel(level);
    }
  };

  // крч добавляем юзеров асинхронно - и запрос шлем и сами добавляем, если ошибка - убираем его
  // с удалением то же самое
  // чтобы не было много загрузок - можно было по многу добавлять

  return (
    <section className={b()}>
      <h2 className={b("title")}>Aliases by level:</h2>
      <div className={b("level-blocks")}>
        {LEVELS_ARRAY.map((level) => (
          <button
            className={b("level-block", {
              selected: selectedLevel === level,
            })}
            key={level}
            onClick={handleLevelBlockClick(level)}
          >
            <span className={b("level-block-text")}>{level}</span>
          </button>
        ))}
        <button
          className={b("level-block", {
            selected: selectedLevel === ALL_LEVELS,
            all: true,
          })}
          onClick={handleLevelBlockClick(ALL_LEVELS)}
        >
          <span className={b("level-block-text")}>All</span>
        </button>
      </div>
      {selectedLevel && (
        <div className={b("content-wrapper")}>
          <div className={b("subtitle-wrapper")}>
            {!isAllLevels ? (
              <h2 className={b("subtitle")}>
                Aliases for <strong>{selectedLevel} level</strong>
              </h2>
            ) : (
              <h2 className={b("subtitle")}>
                Aliases for <strong>all level</strong>
              </h2>
            )}
            <BaseInputString
              onChange={setSearch}
              value={search}
              placeholder="Search"
              className={b("alias-form-input", { search: true })}
            />
          </div>
          {!isAllLevels && <AliasesSectionForm selectedLevel={selectedLevel} />}
          <AliasesSectionList selectedLevel={selectedLevel} search={search} />
        </div>
      )}
    </section>
  );
};
