import b_ from "b_";
import { useStore } from "effector-react";
import {
  $offpeak,
  handleChangeOffpeakFrom,
  handleChangeOffpeakTo,
  postOffpeak,
} from "../../store/Offpeak";
import { BaseButton } from "../BaseButton";
import { BaseInputMask } from "../BaseInputMask";

export const b = b_.with("offpeak-section");

import "./index.scss";

export const OffpeakSection = () => {
  const offpeak = useStore($offpeak);

  return (
    <section className={b()}>
      <h2 className={b("title")}>Offpeak:</h2>
      <div className={b("wrapper")}>
        <BaseInputMask
          value={offpeak.from}
          handleChange={handleChangeOffpeakFrom}
          placeholder="From"
          className={b("input")}
        />
        <BaseInputMask
          value={offpeak.to}
          handleChange={handleChangeOffpeakTo}
          placeholder="To"
          className={b("input")}
        />
        <BaseButton onClick={() => postOffpeak(offpeak)} className={b("button")}>
          SAVE
        </BaseButton>
      </div>
    </section>
  );
};
