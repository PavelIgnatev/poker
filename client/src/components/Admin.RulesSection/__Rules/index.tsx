import React, { useState } from "react";

import { b } from "../index";
import { Level, LevelPlusEffmu, Network, Rule } from "../../../@types/common";

enum RuleType {
  SOME_RULE = "some_rule",
  SOME_RULE2 = "some_rule2",
}
enum RuleColor {
  SOME_COLOR = "some_color",
  SOME_COLOUR = "some_colour",
}

interface RuleForLevel {
  // определяем в этой ком-те
  type: RuleType;
  color: RuleColor;
  values: Array<string | number>;

  // из пропсов идут
  level: LevelPlusEffmu;
  network: Network;
  offpeak?: boolean;
  KO?: boolean; // выбрано KO - true, иначе false
}

// :)
export const RulesSectionRules = () => {
  const [type, setType] = useState(RuleType.SOME_RULE);
  const [color, setColor] = useState(RuleColor.SOME_COLOR);
  const [values, setValues] = useState<Array<string | number>>([]);

  // это мок
  const savedRules = [{ type, color, values } as RuleForLevel];

  const rows = [
    {
      rowStatus: "editable",
      rule: { type, color, values } as RuleForLevel,
    },
    ...savedRules.map((rule) => ({ rowStatus: "saved", rule })),
  ];

  // по аналогии с admin.ability2section__rules.tsx
  return <div></div>;
};
