import b_ from "b_";
import React from "react";

import { getAliasesRequest } from "../../store/Alias";

import { BaseInputString } from "../BaseInputString";
import { LevelBlocks, ALL_LEVELS, useLevelBlocks } from "../LevelBlocks";

import { AliasesSectionForm } from "./__Form";
import { AliasesSectionList } from "./__List";

import "./index.scss";

export const b = b_.with("aliases-section");

export const AliasesSection = () => {
  const [search, setSearch] = React.useState<string>("");

  const { selectedLevel, handleLevelChange } = useLevelBlocks();
  const isAllLevels = selectedLevel === ALL_LEVELS;

  React.useEffect(() => {
    if (isAllLevels) {
      getAliasesRequest();
    } else if (selectedLevel !== null) {
      getAliasesRequest(selectedLevel);
    }
  }, [selectedLevel]);

  // крч добавляем юзеров асинхронно - и запрос шлем и сами добавляем, если ошибка - убираем его
  // с удалением то же самое
  // чтобы не было много загрузок - можно было по многу добавлять

  return (
    <section className={b()}>
      <h2 className={b("title")}>Aliases by level:</h2>
      <LevelBlocks selectedLevel={selectedLevel} onLevelChange={handleLevelChange} withAllLevels />
      {selectedLevel !== null && (
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
