import b_ from "b_";
import React, { FC } from "react";
import { Button, ButtonGroup } from "@mui/material";

import { LEVELS_ARRAY } from "../../constants";

interface Props {
  selectedLevel: number | null;
  onLevelChange: (level: number) => () => void;
}

export const ALL_LEVELS = -1;

const b = b_.with("level-blocks");

export const LevelBlocks: FC<Props> = ({ selectedLevel, onLevelChange }) => (
  <div className={b()}>
    <ButtonGroup variant="contained" aria-label="Number Selector">
      {LEVELS_ARRAY.concat([-1]).map((level) => (
        <Button
          key={level}
          size="large"
          onClick={onLevelChange(level)}
          variant={selectedLevel === level ? "outlined" : "contained"}
          color={selectedLevel === level ? "primary" : undefined}
        >
          {level < 0 ? "all" : level}
        </Button>
      ))}
    </ButtonGroup>
  </div>
);

export const useLevelBlocks = () => {
  const [selectedLevel, setSelectedLevel] = React.useState<number | null>(null);

  const handleLevelChange = (level: number) => () => {
    if (level === selectedLevel) {
      setSelectedLevel(null);
    } else {
      setSelectedLevel(level);
    }
  };

  return { selectedLevel, handleLevelChange };
};
