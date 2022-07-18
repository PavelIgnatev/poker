import React from "react";
import b_ from "b_";

type Network = string;
type Level = number;

interface Props {
  networks2levels: Record<Network, Level>;
}

const b = b_.with("UserCardTable");

export const UserCardTable = ({ networks2levels }: Props) => {
  return (
    <div className={b()}>
      <div className={b("Row", { headline: true })}>
        <div className={b("Cell")}>Network</div>
        <div className={b("Cell")}>Level</div>
      </div>
      {Object.keys(networks2levels).map((network) => (
        <div className={b("Row")} key={network}>
          <div className={b("Cell")}>{network}</div>
          <div className={b("Cell")}>{networks2levels[network]}</div>
        </div>
      ))}
    </div>
  );
};
