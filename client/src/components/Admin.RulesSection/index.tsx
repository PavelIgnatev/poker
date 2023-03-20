import b_ from "b_";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { Effmu } from "../../@types/common";
import { SelectOption } from "../../@types/selectsModel";
import { EFFMU } from "../../constants";
import { getRulesRequest } from "../../store/Rules";
import { SHORT_NETWORKS } from "../../store/Select";

import { SingleSelect } from "../SingleSelect";
import { useElementsToggle } from "../ElementsToggle";
import { LevelBlocks, useLevelBlocks } from "../LevelBlocks";
import { RulesSectionRules } from "./__Rules";

import "./index.scss";

type KOType = "Knockout" | "Freeze-out" | "all";
type StatusType = "Normal" | "Turbo" | "SuperTurbo" | "all";
type ColorsType = "blue" | "green" | "orange";
const KO: KOType[] = ["Knockout", "Freeze-out", "all"];
const Status: StatusType[] = ["Normal", "Turbo", "SuperTurbo", "all"];
const Colors: ColorsType[] = ["blue", "green", "orange"];
const ColorsValues = [
  { value: "blue", label: "Default" },
  { value: "orange", label: "Invert" },
  { value: "green", label: "Exception" },
];

export const b = b_.with("rules-section");

export const RulesSection = () => {
  const { selectedLevel, handleLevelChange } = useLevelBlocks();
  const { selectedElement: selectedEffmu } = useElementsToggle<Effmu | "all">(
    EFFMU[0]
  );
  const { selectedElement: selectedKO, handleElementChange: handleKOChange } =
    useElementsToggle<KOType>(KO[0]);

  const {
    selectedElement: selectedStatus,
    handleElementChange: handleStatusChange,
  } = useElementsToggle<StatusType>(Status[0]);
  const {
    selectedElement: selectedColor,
    handleElementChange: handleColorChange,
  } = useElementsToggle<ColorsType>(Colors[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(
    SHORT_NETWORKS[0].value
  );
  const handleNetworkChange = (option: SelectOption<string>) =>
    setSelectedNetwork(option.value ?? SHORT_NETWORKS[0].value);

  useEffect(() => {
    if (selectedLevel !== null) {
      getRulesRequest({
        color: selectedColor,
        level: selectedLevel + selectedEffmu,
        network: selectedNetwork,
        status: selectedStatus,
        KO: selectedKO,
      });
    }
  }, [
    selectedLevel,
    selectedColor,
    selectedEffmu,
    selectedNetwork,
    selectedStatus,
    selectedKO,
  ]);

  return (
    <section className={b()}>
      <Typography variant="h5" gutterBottom>
        Rules control
      </Typography>
      <LevelBlocks
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
      />
      {selectedLevel !== null && (
        <>
          <div className={b("filter")}>
            <SingleSelect
              label="Network"
              className={b("select")}
              options={SHORT_NETWORKS}
              required
              autoComplete="off"
              defaultValue={SHORT_NETWORKS[0]}
              onSingleChange={handleNetworkChange as any}
            />
            <SingleSelect
              label="Type"
              className={b("select")}
              options={KO.map((k) => ({ value: k, label: k }))}
              required
              autoComplete="off"
              defaultValue={{ value: selectedKO, label: selectedKO }}
              onSingleChange={(e) => handleKOChange(e?.value as any)()}
            />
            <SingleSelect
              label="Status"
              className={b("select")}
              options={Status.map((k) => ({ value: k, label: k }))}
              required
              autoComplete="off"
              defaultValue={{ value: selectedStatus, label: selectedStatus }}
              onSingleChange={(e) => handleStatusChange(e?.value as any)()}
            />
            <SingleSelect
              label="Rule"
              className={b("select")}
              options={ColorsValues}
              required
              autoComplete="off"
              defaultValue={{ value: selectedColor, label: selectedColor }}
              onSingleChange={(e) => handleColorChange(e?.value as any)()}
            />
          </div>
          <RulesSectionRules
            color={selectedColor}
            level={selectedLevel + selectedEffmu}
            network={selectedNetwork}
            status={selectedStatus}
            KO={selectedKO}
          />
        </>
      )}
    </section>
  );
};
