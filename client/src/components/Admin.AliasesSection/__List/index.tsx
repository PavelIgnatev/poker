import { useStore } from "effector-react";
import React, { FC, useState } from "react";

import CloseIcon from "../../../assets/icons/close.svg";
import { deleteConfigRequest, getConfigRequest } from "../../../store/Config";
import {
  $aliases,
  aliasesEvents,
  getAliasesRequest,
} from "../../../store/Alias";
import { $password } from "../../../store/Password";

import { ApprovalSection } from "../../ApprovalSection";

import { b } from "../index";

interface Props {
  selectedLevel: number | null;
}

export const AliasesSectionList: FC<Props> = ({ selectedLevel }) => {
  const [selectedAlias, setSelectedAlias] = React.useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const password = useStore($password);
  const aliases = useStore($aliases);

  const aliasesLoading = useStore(getAliasesRequest.pending);

  if (selectedLevel === null) {
    return null;
  }

  if (aliasesLoading) {
    return <span>Loading</span>;
  }

  const handleAliasClick = (alias: string) => async () => {
    await getConfigRequest({ alias, password });
    handleOpenModal();
  };

  const handleAliasDelete = async () => {
    aliasesEvents.deleteAlias(selectedAlias);
    await deleteConfigRequest({ alias: selectedAlias, password });
    handleCloseModal();
  };

  return (
    <div className={b("alias-list")}>
      {aliases.length ? (
        aliases.map((alias) => (
          <div className={b("alias-item")} key={alias}>
            <div
              className={b("alias-item-text")}
              onClick={handleAliasClick(alias)}
            >
              {alias}
            </div>
            <div
              className={b("alias-item-delete-wrapper")}
              onClick={async () => {
                handleOpenModal();
                setSelectedAlias(alias);
              }}
            >
              <img src={CloseIcon} alt="close" />
            </div>
          </div>
        ))
      ) : (
        <div>The list is empty</div>
      )}
      {/* <Modal ref={settingsModalRef}>
        {selectedConfig ? (
          <UserSettings
            config={selectedConfig}
            isAdminPage={isAdminPage}
            onClose={() => console.log("dsa")}
          />
        ) : (
          <div style={{ padding: 50 }}>Loading config</div>
        )}
      </Modal> */}
      <ApprovalSection
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleAliasDelete}
      />
    </div>
  );
};
