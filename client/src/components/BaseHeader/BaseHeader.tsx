import React, { FC } from "react";
import cx from "classnames";
import {
  $tournamentsSettings,
  editableTournamentsSettings,
  NETWORKS,
  TIMERANGE,
  TIMEZONES,
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
import { $config } from "../../store/Config";
import profileSrc from "../../assets/icons/Profile.svg";

import { Modal, ModalRef } from "../Modal";

import classes from "./BaseHeader.module.scss";
import { UserSettings } from "../UserSettings";

export const BaseHeader: FC = () => {
  const tournamentsSettings = useStore($tournamentsSettings);

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
              className={classes.network}
              children={(tournamentsSettings.network?.length ?? 0) + " networks"}
              options={NETWORKS}
              onChange={editableTournamentsSettings.handleChangeNetwork}
              placeholder="Network"
            />
          </ComponentCategory>
          <ComponentCategory category="Buy-in">
            <div className={classes.inputWrapper}>
              <BaseInput
                value={tournamentsSettings.moneyStart}
                handleChange={editableTournamentsSettings.handleChangeMoneyStart}
                max={tournamentsSettings.moneyEnd ?? 0}
                placeholder="From"
                className={classes.input}
              />
              <BaseInput
                value={tournamentsSettings.moneyEnd}
                handleChange={editableTournamentsSettings.handleChangeMoneyEnd}
                max={10000}
                placeholder="To"
                className={classes.input}
              />
            </div>
          </ComponentCategory>
          <ComponentCategory category="Prizepool" className={classes.prizepool}>
            <div className={classes.inputWrapper}>
              <BaseInput
                value={tournamentsSettings.prizepoolStart}
                handleChange={editableTournamentsSettings.handleChangePrizepoolStart}
                max={tournamentsSettings.prizepoolEnd}
                placeholder="From"
                className={classes.input}
              />
              <BaseInput
                value={tournamentsSettings.prizepoolEnd}
                handleChange={editableTournamentsSettings.handleChangePrizepoolEnd}
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
                  handleChange={editableTournamentsSettings.handleChangeDateStart}
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
                onClick={() => editableTournamentsSettings.handleChangeKo(!tournamentsSettings.KO)}
                className={classes.checkbox}
              >
                KO
              </BaseCheckbox>
              <BaseCheckbox
                selected={!tournamentsSettings.freezout}
                onClick={() =>
                  editableTournamentsSettings.handleChangeFreezout(!tournamentsSettings.freezout)
                }
                className={classes.checkbox}
              >
                Freezout
              </BaseCheckbox>
              <div className={classes.line} />
              <BaseCheckbox
                selected={!tournamentsSettings.normal}
                onClick={() =>
                  editableTournamentsSettings.handleChangeNormal(!tournamentsSettings.normal)
                }
                className={classes.checkbox}
              >
                Normal
              </BaseCheckbox>
              <BaseCheckbox
                selected={!tournamentsSettings.turbo}
                onClick={() =>
                  editableTournamentsSettings.handleChangeTurbo(!tournamentsSettings.turbo)
                }
                className={classes.checkbox}
              >
                Turbo
              </BaseCheckbox>
              <BaseCheckbox
                selected={!tournamentsSettings.superTurbo}
                onClick={() =>
                  editableTournamentsSettings.handleChangeSuperTurbo(
                    !tournamentsSettings.superTurbo,
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
          <ComponentCategory>
            <BaseSelect
              className={classes.timezone}
              options={TIMEZONES}
              defaultValue={TIMEZONES[0]}
              onChange={editableTournamentsSettings.handleChangeTimezone}
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
