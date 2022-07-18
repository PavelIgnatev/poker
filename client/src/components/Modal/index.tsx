import React, { forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import b_ from "b_";

import "./index.scss";

interface Props {
  children: React.ReactNode;
  mix?: string;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
  isOpened: boolean;
}

const b = b_.with("modal");

export const Modal = forwardRef(({ children, mix }: Props, ref) => {
  const [show, setShow] = React.useState(false);

  const open = () => setShow(true);
  const close = () => setShow(false);

  useImperativeHandle<unknown, ModalRef>(ref, () => ({ open, close, isOpened: show }));

  const container = document.getElementById("modal-root");

  if (!container || !show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={b("wrapper")}>
      <div onClick={close} className={b("backdrop")} />
      <div className={cx(b("box"), mix)}>{children}</div>
    </div>,
    container,
  );
});
