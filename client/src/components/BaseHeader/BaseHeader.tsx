import { FC } from "react";
import cx from "classnames";

import {
  $tournamentsSettings,
  editableTournamentsSettings,
  NETWORKS,
  TIMERANGE,
} from "../../store/Select";
import { useStore } from "effector-react";
import { BaseSelect } from "../BaseSelect/BaseSelect";
import { BaseSelectMulti } from "../BaseSelectMulti/BaseSelectMulti";
import { BaseInput } from "../BaseInput/BaseInput";
import { BaseCheckbox } from "../BaseCheckbox";
import { BaseInputMask } from "../BaseInputMask";
import { ComponentCategory } from "../ComponentCategory";
import { BaseButton } from "../BaseButton";
import { fetchUserReposFx } from "../../store/Table";

import classes from "./BaseHeader.module.scss";

export const BaseHeader: FC = () => {
  const tournamentsSettings = useStore($tournamentsSettings);
  const loading = useStore(fetchUserReposFx.pending);

  return (
    <header className={classes.header}>
      <div className={classes.menu}>
        <div className={classes.content}>
          <ComponentCategory category="Network">
            <BaseSelectMulti
              className={classes.network}
              children={
                (tournamentsSettings.network?.length ?? 0) + " networks"
              }
              options={NETWORKS}
              onChange={editableTournamentsSettings.handleChangeNetwork}
              placeholder="Network"
            />
          </ComponentCategory>
          <ComponentCategory category="Buy-in">
            <div className={classes.inputWrapper}>
              <BaseInput
                value={tournamentsSettings.moneyStart}
                handleChange={
                  editableTournamentsSettings.handleChangeMoneyStart
                }
                max={tournamentsSettings.moneyEnd ?? 0}
                placeholder="From"
                className={classes.input}
              />
              <BaseInput
                value={tournamentsSettings.moneyEnd}
                handleChange={editableTournamentsSettings.handleChangeMoneyEnd}
                max={100000}
                placeholder="To"
                className={classes.input}
              />
            </div>
          </ComponentCategory>
          <ComponentCategory category="Prizepool" className={classes.prizepool}>
            <div className={classes.inputWrapper}>
              <BaseInput
                value={tournamentsSettings.prizepoolStart}
                handleChange={
                  editableTournamentsSettings.handleChangePrizepoolStart
                }
                max={tournamentsSettings.prizepoolEnd}
                placeholder="From"
                className={classes.input}
              />
              <BaseInput
                value={tournamentsSettings.prizepoolEnd}
                handleChange={
                  editableTournamentsSettings.handleChangePrizepoolEnd
                }
                max={10000000}
                placeholder="To"
                className={classes.input}
              />
            </div>
          </ComponentCategory>
        </div>
        <div className={classes.content}>
          <div className={classes.starts}>
            <ComponentCategory category="Starts">
              <BaseSelect
                className={classes.time}
                options={TIMERANGE}
                defaultValue={TIMERANGE[1]}
                onChange={editableTournamentsSettings.handleChangeTime}
                placeholder="Time"
              />
            </ComponentCategory>
            <ComponentCategory>
              <div className={classes.inputWrapper}>
                <BaseInputMask
                  placeholder="From(h)"
                  value={tournamentsSettings.dateStart}
                  handleChange={
                    editableTournamentsSettings.handleChangeDateStart
                  }
                  className={cx(classes.input, classes.inputTime)}
                />
                <BaseInputMask
                  placeholder="To(h)"
                  value={tournamentsSettings.dateEnd}
                  handleChange={editableTournamentsSettings.handleChangeDateEnd}
                  className={cx(classes.input, classes.inputTime)}
                />
              </div>
            </ComponentCategory>
            <ComponentCategory></ComponentCategory>
          </div>
          <ComponentCategory category="Format">
            <div className={classes.checkboxWrapper}>
              <BaseCheckbox
                selected={!tournamentsSettings.KO}
                onClick={() =>
                  editableTournamentsSettings.handleChangeKo(
                    !tournamentsSettings.KO
                  )
                }
                className={classes.checkbox}
              >
                KO
              </BaseCheckbox>
              <BaseCheckbox
                selected={!tournamentsSettings.freezout}
                onClick={() =>
                  editableTournamentsSettings.handleChangeFreezout(
                    !tournamentsSettings.freezout
                  )
                }
                className={classes.checkbox}
              >
                Freezout
              </BaseCheckbox>
              <div className={classes.line} />
              <BaseCheckbox
                selected={!tournamentsSettings.normal}
                onClick={() =>
                  editableTournamentsSettings.handleChangeNormal(
                    !tournamentsSettings.normal
                  )
                }
                className={classes.checkbox}
              >
                Normal
              </BaseCheckbox>
              <BaseCheckbox
                selected={!tournamentsSettings.turbo}
                onClick={() =>
                  editableTournamentsSettings.handleChangeTurbo(
                    !tournamentsSettings.turbo
                  )
                }
                className={classes.checkbox}
              >
                Turbo
              </BaseCheckbox>
              <BaseCheckbox
                selected={!tournamentsSettings.superTurbo}
                onClick={() =>
                  editableTournamentsSettings.handleChangeSuperTurbo(
                    !tournamentsSettings.superTurbo
                  )
                }
                className={classes.checkbox}
              >
                Super Turbo
              </BaseCheckbox>
            </div>
          </ComponentCategory>
        </div>
        <div className={classes.content}>
          <BaseButton
            disabled={loading}
            onClick={fetchUserReposFx}
            className={classes.button}
          >
            Games search
          </BaseButton>
        </div>
      </div>
    </header>
  );
};
