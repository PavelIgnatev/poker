import React, { useEffect, useState } from "react";

import { b } from "../index";
import { useStore } from "effector-react";
import { $rules, deleteRulesRequest, postRulesRequest } from "../../../store/Rules";
import { rulesModel, rulesType } from "../../../@types/rulesModel";
import { formatRules } from "../constants";
import { specialSelectStyles } from "../../BaseSelect";
import Select from "react-select";
import { validateNumber } from "../../../helpers/validateNumber";

type RulesSectionRulesProps = {
  color: string;
  level: string;
  network: string;
  status: string;
  KO: boolean;
  offpeak: boolean;
};
type valuesType = Array<Record<string, number | string>>;

export const RulesSectionRules = (props: RulesSectionRulesProps) => {
  const rules = useStore($rules) as Array<rulesModel[]>;
  const types = Object.keys(formatRules) as rulesType[];

  // здесь надо дефолт фиксить
  const [type, setType] = useState<rulesType[]>([types[0], types[0], types[0]]);
  const [values, setValues] = useState<valuesType>([{}]);

  const arrayFill = new Array(formatRules[type[0]].length).fill(null);
  // массив массивов
  // здесь надо фиксить
  const rows = [
    [
      {
        type: type[0],
        values: new Array(formatRules[type[0]].length)
          .fill(null)
          .map((_, i) => values?.[0]?.[i] ?? ""),
        ...props,
      },
      {
        type: type[1],
        values: new Array(formatRules[type[1]].length)
          .fill(null)
          .map((_, i) => values?.[1]?.[i] ?? ""),
        ...props,
      },
      {
        type: type[2],
        values: new Array(formatRules[type[2]].length)
          .fill(null)
          .map((_, i) => values?.[2]?.[i] ?? ""),
        ...props,
      },
    ] as rulesModel[],
    ...rules,
  ];

  const handleValues = (value: string | number, i1: number, i2: number) => {
    setValues((v) => {
      if (!v[i1]) v[i1] = {};
      v[i1][i2] = value;

      return { ...v };
    });
  };

  useEffect(() => setValues([{}]), [type]);

  return (
    <div className={b("rules")}>
      {rows.map((row, i) => {
        const isComposite = row.length > 1;

        console.log(rows);

        return (
          <div className={b("rule", { composite: isComposite })} key={i}>
            {row.map((rule, index) => {
              const { type: ruleType, values: ruleValues } = rule;
              const isFilled = i !== 0;
              const elements = formatRules[rule.type];

              return (
                <>
                  <Select
                    styles={specialSelectStyles}
                    options={types?.map((type) => ({
                      value: type,
                      label: type,
                    }))}
                    onChange={(e) =>
                      setType((v) => {
                        const copyV = v.splice(0);
                        copyV[index] = e?.value ?? types[0];
                        return copyV;
                      })
                    }
                    className={b("rules-select")}
                    isDisabled={isFilled}
                    defaultValue={{ value: ruleType, label: ruleType }}
                  />
                  {elements.map((element, i) => {
                    const { type: elementType, placeholder, options } = element;

                    const isNum = elementType === "number";
                    const isInput = !element.options?.length;
                    const value = String(ruleValues?.[i] || "");

                    return (
                      <div>
                        {isInput ? (
                          <input
                            value={value}
                            onChange={(e) => {
                              const value = e.currentTarget.value;
                              console.log(value);

                              handleValues(isNum ? Number(validateNumber(value)) : value, index, i);
                            }}
                            placeholder={placeholder}
                            disabled={isFilled}
                          />
                        ) : (
                          <Select
                            styles={specialSelectStyles}
                            placeholder={placeholder}
                            options={options?.map((option) => ({
                              value: option,
                              label: option,
                            }))}
                            onChange={(e) => {
                              const value = e?.value || "";
                              handleValues(value, index, i);
                            }}
                            className={b("rules-select")}
                            isDisabled={isFilled}
                          />
                        )}
                      </div>
                    );
                  })}

                  {!isFilled && row.length === index + 1 && ruleValues.every(Boolean) && (
                    <div
                      onClick={() => {
                        postRulesRequest(rows[0]);
                        setValues([{}]);

                        // здесь надо фиксить
                        setType([types[0], types[0], types[0]]);
                      }}
                    >
                      add
                    </div>
                  )}
                  {isFilled && row.length === index + 1 && (
                    <div
                      onClick={() => {
                        deleteRulesRequest(rows[i]);
                      }}
                    >
                      delete
                    </div>
                  )}
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
