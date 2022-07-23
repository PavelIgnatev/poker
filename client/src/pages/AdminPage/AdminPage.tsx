import { useStore } from "effector-react";
import { FC } from "react";
import { AdminAbilitySection } from "../../components/AdminAbilitySection";
import {
  OnPasswordSubmit,
  PasswordSection,
  PasswordSectionType,
} from "../../components/PasswordSection";
import { $isValidAdminPassword, validateAdminPasswordRequest } from "../../store/Password";

export const AdminPage: FC = () => {
  const isAdmin = useStore($isValidAdminPassword);

  const handlePasswordSubmit: OnPasswordSubmit = ({ password }) =>
    validateAdminPasswordRequest(password);

  if (!isAdmin) {
    return <PasswordSection onSubmit={handlePasswordSubmit} type={PasswordSectionType.ADMIN} />;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
      <AdminAbilitySection />
    </>
  );
};
