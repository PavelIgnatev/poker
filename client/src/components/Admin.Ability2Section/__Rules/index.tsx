import { FC, useState } from "react";
import Select from "react-select";

import { getSelectOptionsFromKeys } from "../../../helpers/getSelectOptionsFromKeys";
import { Effmu, Level, Rule } from "../../../@types/common";
import { SelectOption } from "../../../@types/selectsModel";

import { specialSelectStyles } from "../../BaseSelect";
import { BaseInputString } from "../../BaseInputString";
import { BaseButton } from "../../BaseButton";

import { b, SavedRules } from "../index";

interface Props {
  savedRules: SavedRules;
  // здесь хранится что-то типа стейта для каждого поля формы
  state: any;
  level: Level;
  effmu: Effmu;
}

type HandleSaveFn = (value: string) => void;
const handleOnSelectChange = (handleSaveFn: HandleSaveFn) => (option: SelectOption<string>) =>
  handleSaveFn(option?.value ?? "");

export const Ability2SectionRules: FC<Props> = ({ savedRules, state, level, effmu }) => {
  const levelPlusEffmu = level + effmu;
  const selectedRules = savedRules[levelPlusEffmu] || [];

  const [network, setNetwork] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [bid, setBid] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [ability, setAbility] = useState<string>("");

  const ability2 =
    state[network]?.[levelPlusEffmu]?.[currency]?.[bid]?.[status]?.[
      Object.keys(state[network]?.[levelPlusEffmu]?.[currency]?.[bid]?.[status] ?? [])[0]
    ] ?? 0;

  const allNetworks = state;
  const allCurrencies = allNetworks?.[network]?.[levelPlusEffmu];
  const allBids = allCurrencies?.[currency];
  const allStatuses = allBids?.[bid];
  const allNames = {
    [`all (A2: ${ability2})`]: null,
    ...allStatuses?.[status],
  };

  const rows = [
    {
      rowStatus: "editable",
      // type: "wierd_rule_type",
      rule: { network, currency, bid, status, name, ability } as Rule,
    },
    ...selectedRules.map((rule) => ({ rowStatus: "saved", rule })),
  ];

  return (
    <div className={b("rules")}>
      {rows.map(({ rowStatus, rule }, index) => {
        const disabled = rowStatus !== "editable";

        return (
          <div className={b("rules-row")} key={rule.network + rule.bid + rule.name}>
            <Select
              styles={specialSelectStyles}
              placeholder="Network"
              options={getSelectOptionsFromKeys(allNetworks)}
              // @ts-ignore
              onChange={handleOnSelectChange(setNetwork)}
              className={b("rules-select", { network: true })}
              defaultValue={rule.network && { value: rule.network, label: rule.network }}
              isDisabled={disabled}
            />
            <Select
              styles={specialSelectStyles}
              placeholder="Currency"
              options={getSelectOptionsFromKeys(allCurrencies)}
              // @ts-ignore
              onChange={handleOnSelectChange(setCurrency)}
              className={b("rules-select", { currency: true })}
              defaultValue={rule.currency && { value: rule.currency, label: rule.currency }}
              isDisabled={disabled || !rule.network}
            />
            <Select
              styles={specialSelectStyles}
              placeholder="Bid"
              options={getSelectOptionsFromKeys(allBids)}
              // @ts-ignore
              onChange={handleOnSelectChange(setBid)}
              className={b("rules-select", { bid: true })}
              defaultValue={rule.bid && { value: rule.bid, label: rule.bid }}
              isDisabled={disabled || !rule.currency}
            />
            <Select
              styles={specialSelectStyles}
              placeholder="Status"
              options={getSelectOptionsFromKeys(allStatuses)}
              // @ts-ignore
              onChange={handleOnSelectChange(setStatus)}
              className={b("rules-select", { status: true })}
              defaultValue={rule.status && { value: rule.status, label: rule.status }}
              isDisabled={disabled || !rule.bid}
            />
            <Select
              styles={specialSelectStyles}
              placeholder="Name"
              options={getSelectOptionsFromKeys(allNames)}
              // @ts-ignore
              onChange={handleOnSelectChange(setName)}
              className={b("rules-select", { name: true })}
              defaultValue={rule.name && { value: rule.name, label: rule.name }}
              isDisabled={disabled || !rule.status}
            />
            <BaseInputString
              value={rule.ability}
              onChange={setAbility}
              className={b("rules-ability")}
              disabled={disabled}
              placeholder="Ability 2"
            />
            {!disabled && (
              <BaseButton
                onClick={() => {}}
                className={b("button", { apply: true })}
                disabled={!rule.status || !rule.ability}
                green
              >
                Apply
              </BaseButton>
            )}
            {disabled && (
              <BaseButton onClick={() => {}} className={b("button", { delete: true })} red>
                Delete
              </BaseButton>
            )}
          </div>
        );
      })}
    </div>
  );
};
