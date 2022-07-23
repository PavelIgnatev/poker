import React, { FC } from "react";
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
import { BaseInput } from "../BaseInput/BaseInput";
import { BaseCheckbox } from "../BaseCheckbox";
import { BaseInputMask } from "../BaseInputMask";
import { ComponentCategory } from "../ComponentCategory";
import { BaseButton } from "../BaseButton";
import { fetchUserReposFx } from "../../store/Table";
import { $config } from "../../store/Config";
import { $alias } from "../../store/Alias";
import profileSrc from "../../assets/icons/Profile.svg";

import { Modal, ModalRef } from "../Modal";

import classes from "./BaseHeader.module.scss";
import { UserSettings } from "../UserSettings";

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

  const config = useStore($config);

  const settingsModalRef = React.useRef<ModalRef>(null);
  const handleSettingsModalOpen = () => settingsModalRef.current?.open();
  const handleSettingsModalClose = () => settingsModalRef.current?.close();

  return (
    <header className={classes.header}>
      <div className={classes.info}>
        <div className={classes.userInfo}>
          <div className={classes.alias}>
            <img className={classes.profileImage} src={profileSrc} alt="profile" />
            <p>
              Hello, <strong>{config?.alias}!</strong>
            </p>
          </div>
          <div className={classes.dot}></div>
          <div className={classes.mail}>
            <strong>Your e-mail: </strong>
            {config?.mail}
          </div>
        </div>
        <div className={classes.settings} onClick={handleSettingsModalOpen}>
          Edit settings
        </div>
        <Modal ref={settingsModalRef}>
          {config ? (
            <UserSettings config={config} onClose={handleSettingsModalClose} />
          ) : (
            "Loading config"
          )}
        </Modal>
      </div>
      <div className={classes.menu}>
        <div className={classes.content}>
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
        <div className={classes.content}>
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
                  className={cx(classes.input, classes.inputTime)}
                />
                <BaseInputMask
                  placeholder="To(h)"
                  value={dateEnd}
                  handleChange={handleChangeDateEnd}
                  className={cx(classes.input, classes.inputTime)}
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
        <div className={classes.content}>
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
