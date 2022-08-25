import b_ from "b_";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { Effmu, LevelPlusEffmu, Rule } from "../../@types/common";
import { SelectOption } from "../../@types/selectsModel";
import { EFFMU } from "../../constants";
import { getRulesRequest } from "../../store/Rules";
import { SHORT_NETWORKS } from "../../store/Select";

import { specialSelectStyles } from "../BaseSelect";
import { ColorPalette } from "../ColorPalette";
import { ElementsToggle, useElementsToggle } from "../ElementsToggle";
import { LevelBlocks, useLevelBlocks } from "../LevelBlocks";

import "./index.scss";
import { RulesSectionRules } from "./__Rules";

type KOType = "KO" | "Freezout";
type StatusType = "Normal" | "Turbo" | "SuperTurbo";
type ColorsType = "blue" | "red" | "brown" | "black" | "green" | "orange";
const KO: KOType[] = ["KO", "Freezout"];
const Status: StatusType[] = ["Normal", "Turbo", "SuperTurbo"];
const Colors: ColorsType[] = ["blue", "red", "brown", "black", "green", "orange"];

export const b = b_.with("rules-section");

export const RulesSection = () => {
  const { selectedLevel, handleLevelChange } = useLevelBlocks();
  const { selectedElement: selectedEffmu, handleElementChange: handleEffmuChange } =
    useElementsToggle<Effmu>(EFFMU[0]);
  const { selectedElement: selectedKO, handleElementChange: handleKOChange } =
    useElementsToggle<KOType>(KO[0]);
  const { selectedElement: selectedStatus, handleElementChange: handleStatusChange } =
    useElementsToggle<StatusType>(Status[0]);
  const { selectedElement: selectedColor, handleElementChange: handleColorChange } =
    useElementsToggle<ColorsType>(Colors[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(SHORT_NETWORKS[0].value);
  const handleNetworkChange = (option: SelectOption<string>) =>
    setSelectedNetwork(option.value ?? SHORT_NETWORKS[0].value);
  const isKO = selectedKO === KO[0];
  const level = selectedLevel + selectedEffmu;

  useEffect(() => {
    getRulesRequest({
      color: selectedColor,
      level,
      network: selectedNetwork,
      status: selectedStatus,
      KO: isKO,
    });
  }, [selectedLevel, selectedColor, selectedEffmu, selectedNetwork, selectedStatus, selectedKO]);

  return (
    <section className={b()}>
      <span className={b("title")}>Rules for levels:</span>
      <LevelBlocks selectedLevel={selectedLevel} onLevelChange={handleLevelChange} />
      {selectedLevel !== null && (
        <>
          <span className={b("subtitle")}>Rules for {selectedLevel} level</span>
          <div className={b("filter")}>
            <ElementsToggle
              mix={b("elems-toggle", { effmu: true })}
              selectedElement={selectedEffmu}
              onElementChange={handleEffmuChange}
              elements={EFFMU}
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
            KO={isKO}
            offpeak={false}
          />
        </>
      )}
    </section>
  );
};
