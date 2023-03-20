import b_ from "b_";
import React from "react";
import { Typography } from "@mui/material";

import { getAliasesRequest } from "../../store/Alias";
import { LevelBlocks, ALL_LEVELS, useLevelBlocks } from "../LevelBlocks";
import { AliasesSectionForm } from "./__Form";

import { AliasesSectionList } from "./__List";

import "./index.scss";

export const b = b_.with("aliases-section");

export const AliasesSection = () => {
  const { selectedLevel, handleLevelChange } = useLevelBlocks();
  const isAllLevels = selectedLevel === ALL_LEVELS;

  React.useEffect(() => {
    if (isAllLevels) {
      getAliasesRequest();
    } else if (selectedLevel !== null) {
      getAliasesRequest(selectedLevel);
    }
  }, [selectedLevel, isAllLevels]);

  return (
    <section className={b()}>
      <Typography variant="h5" gutterBottom>
        Alias control
      </Typography>
      <LevelBlocks
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
      />
      {selectedLevel !== null && (
        <div className={b("content-wrapper")}>
          {!isAllLevels && <AliasesSectionForm selectedLevel={selectedLevel} />}
          <AliasesSectionList selectedLevel={selectedLevel} />
        </div>
      )}
    </section>
  );
};
