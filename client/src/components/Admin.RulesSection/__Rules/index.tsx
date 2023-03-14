import { useState } from "react";
import Select from "react-select";

import { useStore } from "effector-react";
import { rulesModel, rulesType } from "../../../@types/rulesModel";
import { getUniqueElemKeyGetter } from "../../../helpers/getUniqueElemKeyGetter";
import {
  $rules,
  deleteRulesRequest,
  postRulesRequest,
} from "../../../store/Rules";
import { validateNumber } from "../../../helpers/validateNumber";

import { specialSelectStyles } from "../../BaseSelect";
import { BaseInputString } from "../../BaseInputString";
import { BaseButton } from "../../BaseButton";

import { RULES_TYPES_TO_FIELDS, RULES_TYPES } from "../constants";
import { b } from "../index";

type RulesSectionRulesProps = {
  level: string;
  network: string;
  status: string;
  KO: string;
};
type valuesType = Array<Record<string, number | string>>;

type Field = {
  type: string;
  placeholder: string;
  options: string[];
};

export const RulesSectionRules = (props: RulesSectionRulesProps) => {
  const savedRules = useStore($rules) as Array<rulesModel[]>;

  const [types, setTypes] = useState<rulesType[]>([RULES_TYPES[0]]);
  const [values, setValues] = useState<valuesType>([{}]);

  const handleAddRuleRow = () => {
    setTypes((types) => [...types, RULES_TYPES[0]]);
    setValues((values) => [...values, {}]);
  };

  const handleRemoveRuleRow = (ruleIndex: number) => {
    setTypes((types) => {
      const newTypes = [...types];
      newTypes.splice(ruleIndex, 1);
      return newTypes;
    });
    setValues((values) => {
      const newValues = [...values];
      newValues.splice(ruleIndex, 1);
      return newValues;
    });
  };

  const editableRule = types.map((type, ruleIndex) => ({
    type,
    values: new Array(RULES_TYPES_TO_FIELDS[type].length)
      .fill(null)
      .map((_, i) => values?.[ruleIndex]?.[i] ?? ""),
    ...props,
  }));
  const rules: rulesModel[][] = [editableRule, ...savedRules];

  const handleSaveRule = () => {
    postRulesRequest(editableRule);
    setValues([{}]);
  };

  const handleTypeChange = (rowIndex: number) => (e: any) => {
    setTypes((types) => {
      const newTypes = [...types];
      newTypes[rowIndex] = e?.value ?? RULES_TYPES[0];
      return newTypes;
    });
    setValues((values) => {
      const newValues = [...values];
      newValues[rowIndex] = {};
      return newValues;
    });
  };

  const handleValues = (value: string | number, rowIndex: number, fieldIndex: number) => {
    setValues((values) => {
      const newValues = [...values];

      if (!newValues[rowIndex]) {
        newValues[rowIndex] = {};
      }
      newValues[rowIndex][fieldIndex] = value;

      return newValues;
    });
  };

  const { level, network, status, KO } = props;
  const uniqueElemKeyGetter = getUniqueElemKeyGetter(level + network + status + KO);

  return (
    <div className={b("rules")}>
      {rules.map((ruleRows, ruleIndex) => {
        const isComposite = ruleRows.length > 1;
        const isEditable = ruleIndex === 0;

        const isSaveBtnDisabled = getIsSaveBtnDisabled(ruleRows, values);

        const uniqueRuleKeyGetter = uniqueElemKeyGetter("rule" + ruleIndex);

        return (
          <div className={b("rule", { composite: isComposite })} key={uniqueRuleKeyGetter.key}>
            <div className={b("rule-stripe")} />
            {ruleRows.map((ruleRow, rowIndex) => {
              const { type: ruleType, values: ruleValues } = ruleRow;
              const fields = RULES_TYPES_TO_FIELDS[ruleType] as Field[];
              const isLastRow = rowIndex === ruleRows.length - 1;

              const uniqueRowKeyGetter = uniqueRuleKeyGetter("row" + ruleType + rowIndex);

              return (
                <div className={b("rule-row")} key={uniqueRowKeyGetter.key}>
                  <Select
                    styles={specialSelectStyles}
                    options={RULES_TYPES?.map((type) => ({
                      value: type,
                      label: type,
                    }))}
                    onChange={handleTypeChange(rowIndex)}
                    className={b("rule-row-select")}
                    isDisabled={!isEditable}
                    defaultValue={{ value: ruleType, label: ruleType }}
                    key={String(Math.random()).substr(2, 12)}
                  />
                  {fields.map((field, fieldIndex) => {
                    const { type: elementType, placeholder, options } = field;

                    const isNum = elementType === "number";
                    const value = String(ruleValues?.[fieldIndex] || "");

                    const uniqueFieldKeyGetter = uniqueRowKeyGetter("field" + fieldIndex);

                    if (field.options?.length) {
                      return (
                        <Select
                          className={b("rule-row-field", { select: true })}
                          styles={specialSelectStyles}
                          placeholder={placeholder}
                          defaultValue={value ? { value, label: value } : null}
                          options={options?.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          onChange={(e) => {
                            const value = e?.value || "";

                            handleValues(value, rowIndex, fieldIndex);
                          }}
                          isDisabled={!isEditable}
                          key={String(Math.random()).substr(2, 12)}
                        />
                      );
                    }

                    return (
                      <BaseInputString
                        className={b("rule-row-field", { input: true })}
                        value={value}
                        onChange={(value) => {
                          handleValues(isNum ? validateNumber(value) : value, rowIndex, fieldIndex);
                        }}
                        placeholder={placeholder}
                        disabled={!isEditable}
                        key={uniqueFieldKeyGetter("input").key}
                      />
                    );
                  })}
                  {isEditable && (
                    <BaseButton
                      className={b("rule-row-control-btn")}
                      onClick={() => handleRemoveRuleRow(rowIndex)}
                    >
                      Х
                    </BaseButton>
                  )}
                  {!isEditable && isLastRow && (
                    <BaseButton
                      className={b("rule-row-control-btn")}
                      onClick={() => deleteRulesRequest(rules[ruleIndex])}
                      red
                    >
                      Delete rule
                    </BaseButton>
                  )}
                </div>
              );
            })}

            {isEditable && (
              <div className={b("rule-row")}>
                <BaseButton onClick={handleAddRuleRow} className={b("rule-row-control-btn")}>
                  Add rule row
                </BaseButton>
                <BaseButton
                  onClick={handleSaveRule}
                  className={b("rule-row-control-btn")}
                  green
                  disabled={isSaveBtnDisabled}
                >
                  Save rule
                </BaseButton>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const getIsSaveBtnDisabled = (ruleRows: rulesModel[], values: valuesType) => {
  for (let rowKey = 0; rowKey < ruleRows.length; rowKey += 1) {
    if (!values[rowKey]) {
      return true;
    }
    const fieldKeysCount = RULES_TYPES_TO_FIELDS[ruleRows[rowKey].type].length;
    for (let fieldKey = 0; fieldKey < fieldKeysCount; fieldKey += 1) {
      if (!values[rowKey][fieldKey]) {
        return true;
      }
    }
  }

  return ruleRows.length === 0;
};
