import { FC } from "react";

import classes from "../BaseTable.module.scss";

type TbodyProps = {
  sortedKey: string | null;
  data: Array<Record<string, any>>;
  isReverse: boolean;
};

export const Tbody: FC<TbodyProps> = ({ data, sortedKey, isReverse }) => {
  return (
    <tbody className={classes.tbody}>
      {data
        .slice(0)
        .sort((a, b) => {
          if (!sortedKey) {
            return 0;
          }
          const dataA = String(a[sortedKey] ?? "").toLowerCase();
          const dataB = String(b[sortedKey] ?? "").toLowerCase();

          const numberDataA = Number(dataA);
          const numberDataB = Number(dataB);

          const isNumberDataA = !isNaN(numberDataA);
          const isNumberDataB = !isNaN(numberDataB);

          if (isNumberDataA && isNumberDataB) {
            return isReverse
              ? numberDataB - numberDataA
              : numberDataA - numberDataB;
          }
          if (dataA < dataB) {
            return isReverse ? 1 : -1;
          }
          if (dataA > dataB) {
            return isReverse ? -1 : 1;
          }
          return 0;
        })
        .map((item, index: number) => {
          return (
            <tr className={classes.tr} key={index}>
              <td
                className={classes.td}
                style={{ backgroundColor: item.color, marginBottom: "1px" }}
              >
                {item["@scheduledStartDate"]}
              </td>
              <td
                className={classes.td}
                style={{ backgroundColor: item.color, marginBottom: "1px" }}
              >
                {item["@lateRegEndDate"] ?? "-"}
              </td>
              <td
                className={classes.td}
                style={{ backgroundColor: item.color, marginBottom: "1px" }}
              >
                {item["@network"]}
              </td>
              <td
                className={classes.td}
                style={{ backgroundColor: item.color, marginBottom: "1px" }}
              >
                {item["@name"]}
              </td>
              <td
                className={classes.td}
                style={{ backgroundColor: item.color, marginBottom: "1px" }}
              >
                {item["@bid"]}
              </td>
              <td
                className={classes.td}
                style={{ backgroundColor: item.color, marginBottom: "1px" }}
              >
                {item["@prizepool"]}
              </td>
              <td
                className={classes.td}
                style={{ backgroundColor: item.color, marginBottom: "1px" }}
              >
                {item["@ability"]}
              </td>
              <td
                className={classes.td}
                style={{ backgroundColor: item.color, marginBottom: "1px" }}
              >
                {item["@duration"]}
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};
