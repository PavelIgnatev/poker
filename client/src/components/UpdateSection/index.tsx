import b_ from "b_";
import { useStore } from "effector-react";

import { BaseButton } from "../BaseButton";
import { $update, postUpdate } from "../../store/Update";

import "./index.scss";
import { useCallback } from "react";
import { getDate } from "../../helpers/getDate";

export const b = b_.with("update-section");

export const UpdateSection = () => {
  const update = useStore($update);

  const handleClick = useCallback(() => {
    postUpdate();
    window.location.reload();
  }, []);

  return (
    <section className={b()}>
      <h2 className={b("title", { red: update.isUpdated })}>
        {`Server ${update.isUpdated ? "" : "is not"} updated now`}
      </h2>
      <h2 className={b("title", { red: update.isUpdated })}>
        {update.isUpdated &&
          `Server update has started ${getDate(update.timestamp)} UTC` }
      </h2>
      {!update.isUpdated && (
        <BaseButton onClick={handleClick} className={b("button")}>
          UPDATE SERVER
        </BaseButton>
      )}
    </section>
  );
};
