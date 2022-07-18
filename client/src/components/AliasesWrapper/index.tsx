import React from "react";
import { useStore } from "effector-react";

import { Modal, ModalRef } from "../Modal";
import { UserCard } from "../UserCard";

import { $config, getConfig } from "../../store/Config";
import { $alias, $aliases, handleChangeAlias } from "../../store/Alias";

export const AliasesWrapper = () => {
  const settingsModalRef = React.useRef<ModalRef>(null);
  const handleSettingsModalOpen = () => settingsModalRef.current?.open();
  const handleSettingsModalClose = () => settingsModalRef.current?.close();

  const alias = useStore($alias);
  const config = useStore($config);
  const aliases = useStore($aliases);

  const handleAliasClick = (alias: string) => async () => {
    await handleChangeAlias(alias);
    await getConfig(alias);
    handleSettingsModalOpen();
  };

  return (
    <>
      <span>ALIASES</span>
      {aliases.map((alias) => {
        return <div onClick={handleAliasClick(alias)}>{alias}</div>;
      })}
      <Modal ref={settingsModalRef}>
        {config && alias ? (
          <UserCard alias={alias} key={alias} config={config} onClose={handleSettingsModalClose} />
        ) : (
          "Loading config"
        )}
      </Modal>
    </>
  );
};
