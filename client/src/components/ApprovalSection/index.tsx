import "./index.scss";
import b_ from "b_";
import CloseIcon from "../../assets/icons/close.svg";

export const b = b_.with("approval-section");

interface ApprovalSectionProps {
  onClose: () => void;
  onApprove: () => void;
}

export const ApprovalSection = ({ onApprove, onClose }: ApprovalSectionProps) => {
  return (
    <section className={b()}>
      <h2 className={b("title")}>Do you really want to perform this action?</h2>
      <h4 className={b("subtitle")}>This action cannot be undone</h4>
      <div className={b("button-wrapper")}>
        <button onClick={onApprove} className={b("approve-button")}>
          Agree
        </button>
        <button onClick={onClose} className={b("close-button")}>
          Cancel
        </button>
      </div>
      <button onClick={onClose} className={b("close-icon")}>
        <img src={CloseIcon} alt="close" />
      </button>
    </section>
  );
};
