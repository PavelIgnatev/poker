import React from "react";
import b_ from "b_";

import CloseIcon from "../../assets/icons/close.svg";
import { patchConfig } from "../../store/Config";

import { UserCardTable } from "./__Table";
import { UserCardAliasInfo } from "./__AliasInfo";
import { ConfigModel } from "../../@types/configModel";

import "./index.scss";
interface Props {
  alias: string;
  config: ConfigModel;
  onClose: () => void;
}

export const b = b_.with("UserCard");

export const UserCard = ({ alias, config, onClose }: Props) => {
  const [mail, setMail] = React.useState(config.mail);
  const [effMu, setEffMu] = React.useState(config.effmu);

  const handleSave = () => {
    if (mail !== config.mail || effMu !== config.effmu) {
      patchConfig({
        alias,
        config: { networks: config.networks, mail, effmu: effMu },
      });
    }
    onClose();
  };

  return (
    <div className={b()}>
      <img src={CloseIcon} alt="close" className={b("CloseIcon")} onClick={onClose} />
      <div className={b("Content")}>
        <UserCardTable networks2levels={config.networks} />
        <UserCardAliasInfo
          alias={alias}
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
  );
};
