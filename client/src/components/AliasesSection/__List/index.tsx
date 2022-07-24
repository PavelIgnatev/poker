import { useStore } from "effector-react";
import React, { FC } from "react";

import CloseIcon from "../../../assets/icons/close.svg";
import { $config, clearConfig, deleteConfigRequest, getConfigRequest } from "../../../store/Config";
import { $aliases, aliasesEvents, getAliasesRequest } from "../../../store/Alias";
import { $isValidAdminPassword, $password } from "../../../store/Password";

import { UserSettings } from "../../UserSettings";
import { Modal, ModalRef } from "../../Modal";

import { b } from "../index";

interface Props {
  selectedLevel: number | null;
}

export const AliasesSectionList: FC<Props> = ({ selectedLevel }) => {
  const settingsModalRef = React.useRef<ModalRef>(null);
  const handleSettingsModalOpen = () => settingsModalRef.current?.open();
  const handleSettingsModalClose = () => {
    settingsModalRef.current?.close();
    clearConfig();
  };

  const isAdminPage = useStore($isValidAdminPassword);
  const selectedConfig = useStore($config);
  const password = useStore($password);
  const aliases = useStore($aliases);
  const aliasesLoading = useStore(getAliasesRequest.pending);

  if (!selectedLevel) {
    return null;
  }

  if (aliasesLoading) {
    return <span>Loading</span>;
  }

  const handleAliasClick = (alias: string) => async () => {
    await getConfigRequest({ alias, password });
    handleSettingsModalOpen();
  };

  const handleAliasDelete = (alias: string) => async () => {
    aliasesEvents.deleteAlias(alias);
    await deleteConfigRequest({ alias, password });
  };

  return (
    <div className={b("alias-list")}>
      {aliases.map((alias) => (
        <div className={b("alias-item")} key={alias}>
          <div className={b("alias-item-text")} onClick={handleAliasClick(alias)}>
            {alias}
          </div>
          <div className={b("alias-item-delete-wrapper")} onClick={handleAliasDelete(alias)}>
            <img src={CloseIcon} alt="close" />
          </div>
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
          <div style={{ padding: 50 }}>Loading config</div>
        )}
      </Modal>
    </div>
  );
};
