import "./index.scss";
import b_ from "b_";

import CloseIcon from "../../assets/icons/close.svg";

import { BaseButton } from "../BaseButton";

export const b = b_.with("approval-section");

interface ApprovalSectionProps {
  onClose: () => void;
  onApprove: () => void;
  title?: string;
  subtitle?: string;
  withCloseIcon?: boolean;
}

const DEFAULT_TITLE = "Do you really want to perform this action?";
const DEFAULT_SUBTITLE = "This action cannot be undone";

export const ApprovalSection = ({
  onApprove,
  onClose,
  title,
  subtitle,
  withCloseIcon,
}: ApprovalSectionProps) => {
  return (
    <section className={b()}>
      <h2 className={b("title")}>{title ?? DEFAULT_TITLE}</h2>
      <h4 className={b("subtitle")}>{subtitle ?? DEFAULT_SUBTITLE}</h4>
      <div className={b("button-wrapper")}>
        <BaseButton onClick={onApprove} className={b("approve-button")} autoFocus>
          Agree
        </BaseButton>
        <BaseButton onClick={onClose} className={b("close-button")} clear>
          Cancel
        </BaseButton>
      </div>
      {withCloseIcon && (
        <button onClick={onClose} className={b("close-icon")}>
          <img src={CloseIcon} alt="close" />
        </button>
      )}
    </section>
  );
};
