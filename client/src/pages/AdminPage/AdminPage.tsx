import { useStore } from "effector-react";
import { FC, useEffect } from "react";

import { AliasesSection } from "../../components/Admin.AliasesSection";
import {
  OnPasswordSubmit,
  PasswordSection,
  PasswordSectionType,
} from "../../components/PasswordSection";
import { getSample } from "../../store/Sample";
import { SampleSection } from "../../components/SampleSection";
import {
  $isValidAdminPassword,
  validateAdminPasswordRequest,
} from "../../store/Password";
import { OffpeakSection } from "../../components/OffpeakSection";
import { getOffpeak } from "../../store/Offpeak";
import { RulesSection } from "../../components/Admin.RulesSection";
import { getUpdate } from "../../store/Update";
import { UpdateSection } from "../../components/UpdateSection";

export const AdminPage: FC = () => {
  const isAdmin = useStore($isValidAdminPassword);

  useEffect(() => {
    getSample();
    getUpdate();
    getOffpeak();
  }, [isAdmin]);

  const handlePasswordSubmit: OnPasswordSubmit = ({ password }) =>
    validateAdminPasswordRequest(password);

  if (!isAdmin) {
    return (
      <PasswordSection
        onSubmit={handlePasswordSubmit}
        type={PasswordSectionType.ADMIN}
      />
    );
  }

  return (
    <>
      <section
        style={{ marginTop: "20px", color: "#FF4242", fontSize: "18px" }}
      >
        Welcome to <strong>Admin Panel</strong>
      </section>
      <UpdateSection />
      <SampleSection />
      <OffpeakSection />
      <RulesSection />
      <AliasesSection />
    </>
  );
};
