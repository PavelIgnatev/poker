import { useStore } from "effector-react";
import { FC, useEffect } from "react";
import { AdminAbilitySection } from "../../components/AdminAbilitySection";
import {
  OnPasswordSubmit,
  PasswordSection,
  PasswordSectionType,
} from "../../components/PasswordSection";
import { SampleSection } from "../../components/SampleSection2";
import { $isValidAdminPassword, validateAdminPasswordRequest } from "../../store/Password";
import { getSample } from "../../store/Sample";

export const AdminPage: FC = () => {
  const isAdmin = useStore($isValidAdminPassword);

  useEffect(() => {
    getSample();
  }, []);

  const handlePasswordSubmit: OnPasswordSubmit = ({ password }) =>
    validateAdminPasswordRequest(password);

  if (!isAdmin) {
    return <PasswordSection onSubmit={handlePasswordSubmit} type={PasswordSectionType.ADMIN} />;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
      <SampleSection />
      <AdminAbilitySection />
    </>
  );
};
