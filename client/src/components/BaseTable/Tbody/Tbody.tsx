import { FC } from "react";
import { tableCellModel } from "../../../@types/tableCellModel";
import classes from "../BaseTable.module.scss";

type TbodyProps = {
  data: tableCellModel[] | undefined;
};

export const Tbody: FC<TbodyProps> = ({ data }) => {
  return (
    <tbody className={classes.tbody}>
      {data?.map((item: tableCellModel, index: number) => {
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
