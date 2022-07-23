import b_ from "b_";
import React from "react";
import { useStore } from "effector-react";

import { Modal, ModalRef } from "../Modal";
import { UserSettings } from "../UserSettings";

import { $aliases } from "../../store/Alias";
import { $config, getConfig } from "../../store/Config";
import { $isValidAdminPassword, $password } from "../../store/Password";

import "./index.scss";

const b = b_.with("aliases-section");

export const AliasesSection = () => {
  const settingsModalRef = React.useRef<ModalRef>(null);
  const handleSettingsModalOpen = () => settingsModalRef.current?.open();
  const handleSettingsModalClose = () => settingsModalRef.current?.close();

  const isAdminPage = useStore($isValidAdminPassword);
  const selectedConfig = useStore($config);
  const aliases = useStore($aliases);
  const password = useStore($password);

  const handleAliasClick = (alias: string) => async () => {
    await getConfig({ alias, password });
    handleSettingsModalOpen();
  };

  return (
    <div className={b()}>
      <h2>ALIASES</h2>
      {aliases.map((alias) => (
        <div onClick={handleAliasClick(alias)} key={alias}>
          {alias}
        </div>
      ))}
      <Modal ref={settingsModalRef}>
        {selectedConfig ? (
          <UserSettings
            config={selectedConfig}
            isAdminPage={isAdminPage}
            onClose={handleSettingsModalClose}
          />
        ) : (
          "Loading config"
        )}
      </Modal>
    </div>
  );
};
