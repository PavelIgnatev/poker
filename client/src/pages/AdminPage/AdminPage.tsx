import { useStore } from "effector-react";
import { FC, useEffect } from "react";

import { AliasesSection } from "../../components/Admin.AliasesSection";
import {
  OnPasswordSubmit,
  PasswordSection,
  PasswordSectionType,
} from "../../components/PasswordSection";
import {
  $isValidAdminPassword,
  validateAdminPasswordRequest,
} from "../../store/Password";
import { RulesSection } from "../../components/Admin.RulesSection";
import { EmailSection } from "../../components/EmailSection";
import { getEmail } from "../../store/Email";

export const AdminPage: FC = () => {
  const isAdmin = useStore($isValidAdminPassword);

  useEffect(() => {
    getEmail();
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
      <EmailSection />
      <RulesSection />
      <AliasesSection />
    </>
  );
};
