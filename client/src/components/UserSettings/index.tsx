import { useStore } from "effector-react";
import React from "react";
import b_ from "b_";

import CloseIcon from "../../assets/icons/close.svg";
import { $editableConfig, editableConfigEvents, patchConfig } from "../../store/Config";

import { UserSettingsTable } from "./__Table";
import { UserSettingsInfo } from "./__Info";
import { ConfigModel } from "../../@types/configModel";

import "./index.scss";

interface Props {
  alias: string;
  config: ConfigModel;
  isAdminPage?: boolean;
  onClose: () => void;
}

export const b = b_.with("user-settings");

export const UserSettings = ({ config, isAdminPage, onClose }: Props) => {
  const [progress, setProgress] = React.useState(false);
  const { mail, effmu, alias, networks } = useStore($editableConfig);

  React.useEffect(() => {
    editableConfigEvents.setConfig(config);

    return editableConfigEvents.clearConfig;
  }, [config]);

  if (!alias) {
    return null;
  }

  const handleSubmit = async () => {
    setProgress(true);
    await patchConfig({
      alias,
      config: {
        networks: isAdminPage ? networks : config.networks,
        mail,
        effmu,
        alias,
      },
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
          <UserSettingsInfo alias={alias} effmu={effmu} mail={mail} isAdminPage={isAdminPage} />
          <button onClick={handleSubmit} className={b("save-button")} disabled={progress}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};
