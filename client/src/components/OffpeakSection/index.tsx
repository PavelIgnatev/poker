import b_ from "b_";
import { useStore } from "effector-react";
import {
  $offpeak,
  handleChangeOffpeakFromHour,
  handleChangeOffpeakFromMinutes,
  handleChangeOffpeakToHour,
  handleChangeOffpeakToMinutes,
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
        <div className={b("line")}>
          <BaseInputMask
            value={offpeak.fromHour}
            handleChange={handleChangeOffpeakFromHour}
            placeholder="Hour (from)"
            className={b("input")}
          />
          <BaseInputMask
            value={offpeak.fromMinutes}
            handleChange={handleChangeOffpeakFromMinutes}
            placeholder="Minutes (from)"
            className={b("input")}
          />
        </div>
        <div className={b("line")}>
          <BaseInputMask
            value={offpeak.toHour}
            handleChange={handleChangeOffpeakToHour}
            placeholder="Hour (to)"
            className={b("input")}
          />
          <BaseInputMask
            value={offpeak.toMinutes}
            handleChange={handleChangeOffpeakToMinutes}
            placeholder="Minutes (to)"
            className={b("input")}
          />
        </div>
        <div className={b("line")}>
          <BaseButton onClick={() => postOffpeak(offpeak)} className={b("button")}>
            SAVE
          </BaseButton>
        </div>
      </div>
    </section>
  );
};
