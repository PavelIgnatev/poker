import b_ from "b_";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { Effmu, LevelPlusEffmu, Rule } from "../../@types/common";
import { SelectOption } from "../../@types/selectsModel";
import { EFFMU } from "../../constants";
import { NETWORKS } from "../../store/Select";

import { specialSelectStyles } from "../BaseSelect";
import { ElementsToggle, useElementsToggle } from "../ElementsToggle";
import { LevelBlocks, useLevelBlocks } from "../LevelBlocks";

import "./index.scss";

type KOType = "KO" | "!KO";
const KO: KOType[] = ["KO", "!KO"];

export const b = b_.with("rules-section");

export const RulesSection = () => {
  const { selectedLevel, handleLevelChange } = useLevelBlocks();
  const { selectedElement: selectedEffmu, handleElementChange: handleEffmuChange } =
    useElementsToggle<Effmu>(EFFMU[0]);

  const { selectedElement: selectedKO, handleElementChange: handleKOChange } =
    useElementsToggle<KOType>(KO[0]);
  const isKO = selectedKO === KO[0];

  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0].value);
  const handleNetworkChange = (option: SelectOption<string>) =>
    setSelectedNetwork(option.value ?? NETWORKS[0].value);

  return (
    <section className={b()}>
      <span className={b("title")}>Rules for levels:</span>
      <LevelBlocks selectedLevel={selectedLevel} onLevelChange={handleLevelChange} />
      {selectedLevel && (
        <>
          <span className={b("subtitle")}>Rules for {selectedLevel} level</span>
          <ElementsToggle
            mix={b("elems-toggle")}
            selectedElement={selectedEffmu}
            onElementChange={handleEffmuChange}
            elements={EFFMU}
          />
          <div className={b("filter")}>
            <Select
              styles={specialSelectStyles}
              placeholder="Network"
              options={NETWORKS}
              // @ts-ignore
              onChange={handleNetworkChange}
              className={b("filter-network")}
              defaultValue={NETWORKS[0]}
            />
            <ElementsToggle
              mix={b("elems-toggle")}
              selectedElement={selectedKO}
              onElementChange={handleKOChange}
              elements={KO}
            />
          </div>
        </>
      )}
    </section>
  );
};
