import b_ from "b_";
import React, { FC } from "react";

import { LEVELS_ARRAY } from "../../constants";

import "./index.scss";

interface Props {
  selectedLevel: number | string | null;
  onLevelChange: (level: number | string) => () => void;
  withAllLevels?: boolean;
}

export const ALL_LEVELS = -1;

const b = b_.with("level-blocks");

export const LevelBlocks: FC<Props> = ({ selectedLevel, onLevelChange, withAllLevels }) => (
  <div className={b()}>
    {LEVELS_ARRAY.map((level) => (
      <button
        className={b("block", {
          selected: selectedLevel === level,
        })}
        key={level}
        onClick={onLevelChange(level)}
      >
        <span className={b("block-text")}>{level}</span>
      </button>
    ))}
    {withAllLevels && (
      <button
        className={b("block", {
          selected: selectedLevel === ALL_LEVELS,
          all: true,
        })}
        onClick={onLevelChange(ALL_LEVELS)}
      >
        <span className={b("block-text")}>All</span>
      </button>
    )}
  </div>
);

export const useLevelBlocks = () => {
  const [selectedLevel, setSelectedLevel] = React.useState<number | string | null>(null);

  const handleLevelChange = (level: number | string) => () => {
    if (level === selectedLevel) {
      setSelectedLevel(null);
    } else {
      setSelectedLevel(level);
    }
  };

  return { selectedLevel, handleLevelChange };
};
