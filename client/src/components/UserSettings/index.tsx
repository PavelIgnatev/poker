import { useStore } from "effector-react";
import React from "react";
import b_ from "b_";

import { ConfigModel } from "../../@types/configModel";
import { $editableConfig, editableConfigEvents } from "../../store/Config";

import { UserSettingsTable } from "./__Table";
import { UserSettingsInfo } from "./__Info";

import "./index.scss";

interface Props {
  config: ConfigModel;
}

export const b = b_.with("user-settings");

export const UserSettings = ({ config }: Props) => {
  const editableConfig = useStore($editableConfig);
  const { alias, networks } = editableConfig;

  React.useEffect(() => {
    editableConfigEvents.setConfig(config);

    return editableConfigEvents.clearConfig;
  }, [config]);

  if (!alias) {
    return null;
  }

  return (
    <div className={b()}>
      <div className={b("content")}>
        <div className={b("content-main-block")}>
          <UserSettingsInfo config={editableConfig} isAdminPage />
        </div>
        <UserSettingsTable networks={networks} />
      </div>
    </div>
  );
};
