import { useStore } from "effector-react";
import { FC, useEffect } from "react";

import { AliasesSection } from "../../components/Admin.AliasesSection";
import {
  OnPasswordSubmit,
  PasswordSection,
  PasswordSectionType,
} from "../../components/PasswordSection";
import { getSample } from "../../store/Sample";
import {
  $isValidAdminPassword,
  validateAdminPasswordRequest,
} from "../../store/Password";
import { RulesSection } from "../../components/Admin.RulesSection";
import { getUpdate } from "../../store/Update";

export const AdminPage: FC = () => {
  const isAdmin = useStore($isValidAdminPassword);

  useEffect(() => {
    getSample();
    getUpdate();
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
      <RulesSection />
      <AliasesSection />
    </>
  );
};
