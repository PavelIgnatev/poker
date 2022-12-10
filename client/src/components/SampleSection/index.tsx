import b_ from "b_";
import { useStore } from "effector-react";
import { $sample, handleChangeSample, postSample } from "../../store/Sample";
import { BaseButton } from "../BaseButton";
import { BaseInputNumber } from "../BaseInputNumber";

import "./index.scss";

export const b = b_.with("sample-section");

export const SampleSection = () => {
  const sample = useStore($sample);

  return (
    <section className={b()}>
      <h2 className={b("title")}>Sample:</h2>
      <div className={b("wrapper")}>
        <BaseInputNumber
          value={sample}
          handleChange={handleChangeSample}
          placeholder="Sample"
          className={b("input")}
        />
        <BaseButton
          onClick={() => postSample({ sample })}
          className={b("button")}
        >
          SAVE
        </BaseButton>
      </div>
    </section>
  );
};
