import { useStore } from "effector-react";
import React from "react";
import b_ from "b_";

import CloseIcon from "../../assets/icons/close.svg";
import { $password } from "../../store/Password";
import { ConfigModel } from "../../@types/configModel";
import {
  $editableConfig,
  editableConfigEvents,
  patchConfigRequest,
} from "../../store/Config";

import { BaseButton } from "../BaseButton";

import { UserSettingsTable } from "./__Table";
import { UserSettingsInfo } from "./__Info";

import "./index.scss";
import { getAliasesRequest } from "../../store/Alias";

interface Props {
  config: ConfigModel;
  isAdminPage?: boolean;
  onClose: () => void;
}

export const b = b_.with("user-settings");

export const UserSettings = ({ config, isAdminPage, onClose }: Props) => {
  const [progress, setProgress] = React.useState(false);

  const editableConfig = useStore($editableConfig);
  const { alias, networks, password: newPassword, ...props } = editableConfig;

  const password = useStore($password);

  React.useEffect(() => {
    editableConfigEvents.setConfig(config);

    return editableConfigEvents.clearConfig;
  }, [config]);

  if (!alias) {
    return null;
  }

  const handleSubmit = async () => {
    setProgress(true);
    await patchConfigRequest({
      alias,
      config: {
        ...props,
        networks,
        password: isAdminPage ? newPassword : config.password,
        alias,
      },
      password,
    });
    setProgress(false);

    onClose();
  };

  return (
    <div className={b()}>
      <button onClick={onClose} className={b("close-icon")}>
        <img src={CloseIcon} alt="close" />
      </button>
      <div className={b("content")}>
        <UserSettingsTable networks={networks} canChangeLevels={isAdminPage} />
        <div className={b("content-main-block")}>
          <UserSettingsInfo config={editableConfig} isAdminPage={isAdminPage} />
          <BaseButton
            onClick={handleSubmit}
            className={b("save-button")}
            disabled={progress}
          >
            Save changes
          </BaseButton>
        </div>
      </div>
    </div>
  );
};
