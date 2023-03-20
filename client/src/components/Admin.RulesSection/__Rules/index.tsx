import { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useStore } from "effector-react";
import { rulesModel, rulesType } from "../../../@types/rulesModel";
import { getUniqueElemKeyGetter } from "../../../helpers/getUniqueElemKeyGetter";
import {
  $rules,
  deleteRulesRequest,
  postRulesRequest,
} from "../../../store/Rules";
import { validateNumber } from "../../../helpers/validateNumber";

import { BaseButton } from "../../BaseButton";

import { RULES_TYPES_TO_FIELDS, RULES_TYPES } from "../constants";
import { b } from "../index";
import { SingleSelect } from "../../SingleSelect";
import { ConfirmationDialog } from "../../ConfirmationDialog";

type RulesSectionRulesProps = {
  color: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const rules: rulesModel[][] = [
    editableRule,
    ...(savedRules ? savedRules : []),
  ];

  const handleRulesCancel = () => {
    setIsModalOpen(false);
  };

  const handleRulesOpen = () => {
    setIsModalOpen(true);
  };

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

  const handleValues = (
    value: string | number,
    rowIndex: number,
    fieldIndex: number
  ) => {
    setValues((values) => {
      const newValues = [...values];

      if (!newValues[rowIndex]) {
        newValues[rowIndex] = {};
      }
      newValues[rowIndex][fieldIndex] = value;

      return newValues;
    });
  };

  const { color, level, network, status, KO } = props;
  const uniqueElemKeyGetter = getUniqueElemKeyGetter(
    color + level + network + status + KO
  );

  return (
    <div className={b("rules")}>
      {rules.map((ruleRows, ruleIndex) => {
        const isComposite = ruleRows.length > 1;
        const isEditable = ruleIndex === 0;

        const isSaveBtnDisabled = getIsSaveBtnDisabled(ruleRows, values);

        const uniqueRuleKeyGetter = uniqueElemKeyGetter("rule" + ruleIndex);

        return (
          <div
            className={b("rule", { composite: isComposite })}
            key={uniqueRuleKeyGetter.key}
          >
            <div className={b("rule-stripe")} />
            {ruleRows.map((ruleRow, rowIndex) => {
              const { type: ruleType, values: ruleValues } = ruleRow;
              const fields = RULES_TYPES_TO_FIELDS[ruleType] as Field[];
              const isLastRow = rowIndex === ruleRows.length - 1;

              const uniqueRowKeyGetter = uniqueRuleKeyGetter(
                "row" + ruleType + rowIndex
              );

              return (
                <div className={b("rule-row")} key={uniqueRowKeyGetter.key}>
                  <SingleSelect
                    options={RULES_TYPES?.map((type) => ({
                      value: type,
                      label: type,
                    }))}
                    disabled={!isEditable}
                    label="Modifier"
                    required
                    style={{ width: "150px" }}
                    onSingleChange={handleTypeChange(rowIndex)}
                    className={b("rule-row-select")}
                    defaultValue={{ value: ruleType, label: ruleType }}
                  />
                  {fields.map((field, fieldIndex) => {
                    const { type: elementType, placeholder, options } = field;

                    const isNum = elementType === "number";
                    const value = String(ruleValues?.[fieldIndex] || "");

                    const uniqueFieldKeyGetter = uniqueRowKeyGetter(
                      "field" + fieldIndex
                    );

                    if (field.options?.length) {
                      return (
                        <SingleSelect
                          // className={b("rule-row-field", { select: true })}
                          label={placeholder}
                          defaultValue={value ? { value, label: value } : null}
                          options={options?.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          disabled={!isEditable}
                          onSingleChange={(e) => {
                            const value = e?.value || "";
                            handleValues(value, rowIndex, fieldIndex);
                          }}
                          key={String(Math.random()).substr(2, 12)}
                        />
                      );
                    }

                    return (
                      <TextField
                        label={placeholder}
                        name={placeholder}
                        value={value}
                        autoComplete="off"
                        required
                        disabled={!isEditable}
                        onChange={(e) => {
                          const value = e.currentTarget.value;

                          handleValues(
                            isNum ? validateNumber(value) : value,
                            rowIndex,
                            fieldIndex
                          );
                        }}
                        key={uniqueFieldKeyGetter("input").key}
                      />
                    );
                  })}
                  {isEditable && (
                    <IconButton
                      color="error"
                      aria-label="delete user"
                      style={{ width: "56px" }}
                      onClick={() => handleRemoveRuleRow(rowIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {!isEditable && isLastRow && (
                    <IconButton
                      color="error"
                      aria-label="delete user"
                      style={{ width: "56px" }}
                      onClick={() => handleRulesOpen()}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  <ConfirmationDialog
                    isOpen={isModalOpen}
                    title="Are you sure?"
                    content="Do you really want to perform this action?"
                    onCancel={handleRulesCancel}
                    onConfirm={() => {
                      deleteRulesRequest(rules[ruleIndex]);
                      handleRulesCancel();
                    }}
                  />
                </div>
              );
            })}

            {isEditable && (
              <div className={b("rule-row")}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleAddRuleRow}
                >
                  Add rule row
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={handleSaveRule}
                  disabled={isSaveBtnDisabled}
                >
                  Save rule
                </Button>
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
