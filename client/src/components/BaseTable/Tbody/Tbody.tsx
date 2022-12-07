import { FC, useState } from "react";
import { tableCellModel } from "../../../@types/tableCellModel";
import classes from "../BaseTable.module.scss";

type TbodyProps = {
  sortedKey: string | null;
  data: Array<Record<string, any>>;
  isReverse:boolean;

};

export const Tbody: FC<TbodyProps> = ({ data, sortedKey, isReverse }) => {
  console.log(data);
  return (
    <tbody className={classes.tbody}>
      {data.slice(0).sort((a, b) => {
        if (!sortedKey) {
          return 0;
        }
        const dataA = String(a[sortedKey] ?? '').toLowerCase();
        const dataB = String(b[sortedKey] ?? '').toLowerCase();

        const numberDataA = Number(dataA);
        const numberDataB = Number(dataB);

        const isNumberDataA = !isNaN(numberDataA)
        const isNumberDataB = !isNaN(numberDataB)

        if(isNumberDataA && isNumberDataB) {
          return isReverse? numberDataB - numberDataA: numberDataA - numberDataB;
        }
        if (dataA < dataB) {
          return isReverse ? 1 : -1 
        }
        if (dataA > dataB) {
          return isReverse ? -1 : 1 
          
        }
        return 0
      }).map((item, index: number) => {
        const param = {
          timezone: item["@timezone"],
          network: item["@network"],
          level: item["@level"],
          currency: item["@currency"],
          bid: String(item["@realBid"]),
          status: item["@status"],
        };

        return (
          <tr className={classes.tr} key={index}>
            <td className={classes.td}>{item["@scheduledStartDate"]}</td>
            <td className={classes.td}>{item["@lateRegEndDate"] ?? "-"}</td>
            <td className={classes.td}>{item["@network"]}</td>
            <td className={classes.td}>{item["@name"]}</td>
            <td className={classes.td}>{item["@bid"]}</td>
            <td className={classes.td}>{item["@prizepool"]}</td>
            <td className={classes.td}>{item["@ability"]}</td>
            <td
              className={classes.td}
              onClick={() => {
                if (window.location.pathname !== "/info" && item["@abilityBid"] !== "-") {
                  window.open(`/info?${new URLSearchParams(param).toString()}`);
                }
              }}
            >
              {item["@abilityBid"]}
            </td>
            <td className={classes.td}>{item["@duration"]}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
