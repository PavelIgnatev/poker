import classNames from "classnames";
import { FC, useState } from "react";

import { getSelectOptionsFromKeys } from "../../../helpers/getSelectOptionsFromKeys";
import { fetchSettings, postFetchSettings } from "../../../store/Settings";
import { BaseInputNumber } from "../../BaseInputNumber";
import { BaseSelect } from "../../BaseSelect";

const classes: any = {};

type RulesProps = {
  state: any;
  rule: any;
  levelPlusEffmu: string;
  minus: () => void;
};

export const Rules: FC<RulesProps> = ({ state, rule, levelPlusEffmu, minus }) => {
  const [value1, setValue1] = useState<string>(rule?.network ?? "");
  const [value2] = useState<string>(levelPlusEffmu);
  const [value3, setValue3] = useState<string>(rule?.currency ?? "");
  const [value4, setValue4] = useState<string>(rule?.bid ?? "");
  const [value5, setValue5] = useState<string>(rule?.status ?? "");
  const [value6, setValue6] = useState<string>(rule?.name ?? "");
  const [value7, setValue7] = useState<string>(rule?.ability ?? "");

  const isValue1 = value1?.length;
  const isValue3 = value3?.length;
  const isValue4 = value4?.length;
  const isValue5 = value5?.length;
  const isValue6 = value6?.length;
  const isValue7 = value7?.length;

  const ability2 =
    state[value1]?.[value2]?.[value3]?.[value4]?.[value5]?.[
      Object.keys(state[value1]?.[value2]?.[value3]?.[value4]?.[value5] ?? [])[0]
    ] ?? 0;

  const formData = {
    network: value1,
    level: value2,
    currency: value3,
    bid: value4,
    status: value5,
    name: value6,
    ability: value7,
    ability2,
  };

  const allObj: Record<string, null> = { [`all (A2: ${ability2})`]: null };

  return (
    <div className={classes.Rules}>
      <BaseSelect
        placeholder="Network"
        options={getSelectOptionsFromKeys(state)}
        onChange={(e) => setValue1(e?.value ?? "")}
        disabled={Boolean(isValue1)}
        defaultValue={value1 ? { value: value1, label: value1 } : null}
      />
      <BaseSelect
        placeholder="Currency"
        options={getSelectOptionsFromKeys(state[value1]?.[value2])}
        onChange={(e) => setValue3(e?.value ?? "")}
        disabled={!isValue1 || Boolean(isValue3)}
        defaultValue={value3 ? { value: value3, label: value3 } : null}
      />
      <BaseSelect
        placeholder="Bid"
        options={getSelectOptionsFromKeys(state[value1]?.[value2]?.[value3])}
        onChange={(e) => setValue4(e?.value ?? "")}
        disabled={!isValue3 || !isValue1 || Boolean(isValue4)}
        defaultValue={value4 ? { value: value4, label: value4 } : null}
      />
      <BaseSelect
        placeholder="Status"
        options={getSelectOptionsFromKeys(state[value1]?.[value2]?.[value3]?.[value4])}
        onChange={(e) => setValue5(e?.value ?? "")}
        defaultValue={value5 ? { value: value5, label: value5 } : null}
        disabled={!isValue4 || !isValue3 || !isValue1 || Boolean(isValue5)}
      />
      <BaseSelect
        placeholder="Name"
        className={classes.name}
        options={getSelectOptionsFromKeys({
          ...allObj,
          ...state[value1]?.[value2]?.[value3]?.[value4]?.[value5],
        })}
        onChange={(e) => setValue6(e?.value ?? "")}
        defaultValue={value6 ? { value: value6, label: value6 } : null}
        disabled={!isValue5 || !isValue4 || !isValue3 || !isValue1 || Boolean(isValue6)}
      />
      <BaseInputNumber
        placeholder="Ability2"
        className={classes.button}
        value={value7 ?? ""}
        handleChange={(value) => {
          setValue7(value);
        }}
        disabled={
          !isValue6 || !isValue5 || !isValue4 || !isValue3 || !isValue1 || Boolean(isValue7 && rule)
        }
      />
      <button
        onClick={async () => {
          await postFetchSettings({ method: "add", ...formData });
          await fetchSettings();
          minus();
        }}
        className={classNames(classes.button, {
          [classes.inactive]: rule,
          [classes.disabled]:
            !isValue7 || !isValue6 || !isValue5 || !isValue4 || !isValue3 || !isValue1,
        })}
      >
        Apply
      </button>
      <button
        onClick={async () => {
          await postFetchSettings({ method: "delete", ...formData });
          fetchSettings();
        }}
        className={classNames(classes.button, {
          [classes.inactive]: !rule,
        })}
      >
        Cancel
      </button>
    </div>
  );
};
