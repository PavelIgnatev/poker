import { FC } from "react";
import cx from "classnames";
import {
  $level,
  $moneyEnd,
  $moneyStart,
  handleChangeDateEnd,
  handleChangeDateStart,
  handleChangeMoneyEnd,
  handleChangeMoneyStart,
  handleChangeNetwork,
  handleChangeOnlyFreezout,
  handleChangeOnlyKO,
  handleChangeOnlyNormal,
  handleChangeOnlySuperTurbo,
  handleChangeOnlyTurbo,
  handleChangeTime,
  handleChangeTimezone,
} from "../../store/Select";
import {
  $network,
  $onlyKO,
  $onlyTurbo,
  $onlySuperTurbo,
  $stateNetwork,
  $stateTime,
  $dateStart,
  $dateEnd,
  $onlyFreezout,
  $onlyNormal,
  $stateTimezone,
} from "../../store/Select/state";
import { useStore } from "effector-react";
import { BaseSelect } from "../BaseSelect/BaseSelect";
import { BaseSelectMulti } from "../BaseSelectMulti/BaseSelectMulti";
import { UpdateButton } from "../UpdateButton/UpdateButton";
import { BaseInput } from "../BaseInput/BaseInput";
import { BaseCheckbox } from "../BaseCheckbox";
import classes from "./BaseHeader.module.scss";
import { BaseInputMask } from "../BaseInputMask";
import { ComponentCategory } from "../ComponentCategory";
import { BaseButton } from "../BaseButton";
import { fetchUserReposFx } from "../../store/Table";

export const BaseHeader: FC = () => {
  const moneyStart = useStore($moneyStart),
    moneyEnd = useStore($moneyEnd),
    levelInfo = useStore($level),
    onlyKO = useStore($onlyKO),
    onlyTurbo = useStore($onlyTurbo),
    onlySuperTurbo = useStore($onlySuperTurbo),
    maxMoneyEnd = levelInfo?.moneyEnd ?? 1,
    dateStart = useStore($dateStart),
    dateEnd = useStore($dateEnd),
    onlyFreezout = useStore($onlyFreezout),
    onlyNormal = useStore($onlyNormal),
    networkLength = useStore($network)?.length ?? 0;

  return (
    <header className={classes.header}>
      <div className={classes.wrap}>
        <div className={classes.wr}>
          <ComponentCategory category="Network">
            <BaseSelectMulti
              children={networkLength + " networks"}
              className={classes.network}
              options={$stateNetwork}
              onChange={handleChangeNetwork}
              placeholder="Network"
            />
          </ComponentCategory>
          <ComponentCategory category="Buy-in">
            <div className={classes.inputWrapper}>
              <BaseInput
                value={moneyStart}
                handleChange={handleChangeMoneyStart}
                max={moneyEnd}
                placeholder="From"
                className={classes.input}
              />
              <BaseInput
                value={moneyEnd}
                handleChange={handleChangeMoneyEnd}
                max={maxMoneyEnd}
                placeholder="To"
                className={classes.input}
              />
            </div>
          </ComponentCategory>
        </div>
        <div className={classes.wr}>
          <div className={classes.starts}>
            <ComponentCategory category="Starts">
              <BaseSelect
                className={classes.time}
                options={$stateTime}
                onChange={handleChangeTime}
                placeholder="Time"
              />
            </ComponentCategory>
            <ComponentCategory>
              <div className={classes.inputWrapper}>
                <BaseInputMask
                  placeholder="From(h)"
                  value={dateStart}
                  handleChange={handleChangeDateStart}
                  className={cx(classes.input, classes.b)}
                />
                <BaseInputMask
                  placeholder="To(h)"
                  value={dateEnd}
                  handleChange={handleChangeDateEnd}
                  className={cx(classes.input, classes.b)}
                />
              </div>
            </ComponentCategory>
          </div>
          <ComponentCategory category="Format">
            <div className={classes.checkboxWrapper}>
              <BaseCheckbox
                selected={!onlyKO}
                onClick={() => handleChangeOnlyKO(!onlyKO)}
                className={classes.checkbox}
              >
                KO
              </BaseCheckbox>
              <BaseCheckbox
                selected={!onlyFreezout}
                onClick={() => handleChangeOnlyFreezout(!onlyFreezout)}
                className={classes.checkbox}
              >
                Freezout
              </BaseCheckbox>
              <BaseCheckbox
                selected={!onlyNormal}
                onClick={() => handleChangeOnlyNormal(!onlyNormal)}
                className={classes.checkbox}
              >
                Normal
              </BaseCheckbox>
              <BaseCheckbox
                selected={!onlyTurbo}
                onClick={() => handleChangeOnlyTurbo(!onlyTurbo)}
                className={classes.checkbox}
              >
                Turbo
              </BaseCheckbox>
              <BaseCheckbox
                selected={!onlySuperTurbo}
                onClick={() => handleChangeOnlySuperTurbo(!onlySuperTurbo)}
                className={classes.checkbox}
              >
                Super Turbo
              </BaseCheckbox>
            </div>
          </ComponentCategory>
        </div>
        <div className={classes.wr}>
          <ComponentCategory>
            <BaseSelect
              className={classes.timezone}
              options={$stateTimezone}
              onChange={handleChangeTimezone}
              placeholder="Timezone"
            />
          </ComponentCategory>
          <BaseButton onClick={fetchUserReposFx} className={classes.button}>
            Games search
          </BaseButton>
        </div>
      </div>
    </header>
  );
};
