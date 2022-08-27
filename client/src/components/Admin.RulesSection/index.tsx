import b_ from "b_";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { Effmu } from "../../@types/common";
import { SelectOption } from "../../@types/selectsModel";
import { EFFMU } from "../../constants";
import { getRulesRequest } from "../../store/Rules";
import { SHORT_NETWORKS } from "../../store/Select";

import { specialSelectStyles } from "../BaseSelect";
import { ColorPalette } from "../ColorPalette";
import { ElementsToggle, useElementsToggle } from "../ElementsToggle";
import { ALL_LEVELS, LevelBlocks, useLevelBlocks } from "../LevelBlocks";
import { RulesSectionRules } from "./__Rules";

import "./index.scss";

type KOType = "KO" | "Freezout" | "all";
type StatusType = "Normal" | "Turbo" | "SuperTurbo" | "all";
type ColorsType = "blue" | "red" | "brown" | "black" | "green" | "orange";
const KO: KOType[] = ["KO", "Freezout", "all"];
const Status: StatusType[] = ["Normal", "Turbo", "SuperTurbo", "all"];
const Colors: ColorsType[] = ["blue", "red", "brown", "black", "green", "orange"];

export const b = b_.with("rules-section");

export const RulesSection = () => {
  const { selectedLevel, handleLevelChange } = useLevelBlocks();
  const { selectedElement: selectedEffmu, handleElementChange: handleEffmuChange } =
    useElementsToggle<Effmu | "all">(EFFMU[0]);
  const { selectedElement: selectedKO, handleElementChange: handleKOChange } =
    useElementsToggle<KOType>(KO[0]);
  const { selectedElement: selectedStatus, handleElementChange: handleStatusChange } =
    useElementsToggle<StatusType>(Status[0]);
  const { selectedElement: selectedColor, handleElementChange: handleColorChange } =
    useElementsToggle<ColorsType>(Colors[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(SHORT_NETWORKS[0].value);
  const handleNetworkChange = (option: SelectOption<string>) =>
    setSelectedNetwork(option.value ?? SHORT_NETWORKS[0].value);
  const level = selectedLevel + selectedEffmu;
  const isAllLevels = selectedLevel === ALL_LEVELS;

  useEffect(() => {
    getRulesRequest({
      color: selectedColor,
      level,
      network: selectedNetwork,
      status: selectedStatus,
      KO: selectedKO,
    });
  }, [selectedLevel, selectedColor, selectedEffmu, selectedNetwork, selectedStatus, selectedKO]);

  return (
    <section className={b()}>
      <span className={b("title")}>Rules for levels:</span>
      <LevelBlocks selectedLevel={selectedLevel} onLevelChange={handleLevelChange} withAllLevels />
      {selectedLevel !== null && (
        <>
          {!isAllLevels ? (
            <h2 className={b("subtitle")}>
              Rules for <strong>{selectedLevel} level</strong>
            </h2>
          ) : (
            <h2 className={b("subtitle")}>
              Rules for <strong>all level</strong>
            </h2>
          )}
          <div className={b("filter")}>
            <ElementsToggle
              mix={b("elems-toggle", { effmu: true })}
              selectedElement={selectedEffmu}
              onElementChange={handleEffmuChange}
              elements={EFFMU.concat(["all"])}
            />
            <Select
              styles={specialSelectStyles}
              placeholder="Network"
              options={SHORT_NETWORKS}
              // @ts-ignore
              onChange={handleNetworkChange}
              className={b("filter-network")}
              defaultValue={SHORT_NETWORKS[0]}
            />
            <ColorPalette
              selectedElement={selectedColor}
              onElementChange={handleColorChange}
              elements={Colors}
            />
          </div>
          <div className={b("filter")}>
            <ElementsToggle
              mix={b("elems-toggle", { KO: true })}
              selectedElement={selectedKO}
              onElementChange={handleKOChange}
              elements={KO}
            />
            <div className={b("elems-toggle-divider")} />
            <ElementsToggle
              mix={b("elems-toggle", { status: true })}
              selectedElement={selectedStatus}
              onElementChange={handleStatusChange}
              elements={Status}
            />
          </div>
          <RulesSectionRules
            color={selectedColor}
            level={level}
            network={selectedNetwork}
            status={selectedStatus}
            KO={selectedKO}
            offpeak={false}
          />
        </>
      )}
    </section>
  );
};
