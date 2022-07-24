import b_ from "b_";
import React from "react";

import { LEVELS_ARRAY } from "../../constants";
import { getAliasesRequest } from "../../store/Alias";

import { AliasesSectionForm } from "./__Form";
import { AliasesSectionList } from "./__List";

import "./index.scss";

export const b = b_.with("aliases-section");

const ALL_LEVELS = -1;

export const AliasesSection = () => {
  const [selectedLevel, setSelectedLevel] = React.useState<number | null>(null);
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
    <div className={b()}>
      <h2 className={b("title")}>Alias by levels:</h2>
      <div className={b("level-blocks")}>
        {LEVELS_ARRAY.map((level) => (
          <button
            className={b("level-block", {
              selected: selectedLevel === level,
            })}
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
          <AliasesSectionForm />
          <AliasesSectionList selectedLevel={selectedLevel} />
        </div>
      )}
    </div>
  );
};
