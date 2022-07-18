import React from "react";
import b_ from "b_";
import { useStore } from "effector-react";

import CloseIcon from "../../assets/icons/close.svg";
import { Modal, ModalRef } from "../Modal";
import { $config, getConfig, patchConfig } from "../../store/Config";

import { UserCardTable } from "./__Table";
import { UserCardAliasInfo } from "./__AliasInfo";

import "./index.scss";

interface Props {
  alias: string;
}

export const b = b_.with("UserCard");

export const UserCard = ({ alias }: Props) => {
  const modalRef = React.useRef<ModalRef>();
  const handleOpen = () => modalRef.current?.open();
  const handleClose = () => modalRef.current?.close();

  const config = useStore($config);
  const [mail, setMail] = React.useState("");
  const [effMu, setEffMu] = React.useState<"A" | "B">("A");

  React.useEffect(() => {
    getConfig(alias).then((config) => {
      setMail(config.mail);
      setEffMu(config.effmu);
    });
  }, [alias]);

  const handleSave = () => {
    if (config && (mail !== config.mail || effMu !== config.effmu)) {
      patchConfig({
        alias,
        config: { networks: config.networks, mail, effmu: effMu },
      });
    }
    handleClose();
  };

  if (!config) {
    return <span>"Загружаем конфиг"</span>;
  }

  return (
    <>
      <button onClick={handleOpen}>Редактировать алиас</button>
      <Modal ref={modalRef}>
        <div className={b()}>
          <img src={CloseIcon} alt="close" className={b("CloseIcon")} onClick={handleClose} />
          <div className={b("Content")}>
            <UserCardTable networks2levels={config.networks} />
            <UserCardAliasInfo
              alias="valeria"
              effMu={effMu}
              setEffMu={setEffMu}
              mail={mail}
              setMail={setMail}
            />
          </div>
          <div onClick={handleSave} className={b("SaveButton")}>
            Save changes
          </div>
        </div>
      </Modal>
    </>
  );
};
