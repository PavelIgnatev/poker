import React from "react";
import { Modal, Button } from "@material-ui/core";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ApprovalSection: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>
        <h2>Действительно ли вы хотите подтвердить действие?</h2>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onConfirm}>Подтвердить</Button>
      </div>
    </Modal>
  );
};
