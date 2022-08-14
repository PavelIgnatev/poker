import { useStore } from "effector-react";
import { FC, useEffect } from "react";

import { Ability2Section } from "../../components/Admin.Ability2Section";
import { AdmissibleStatusSection } from "../../components/Admin.AdmissibleStatusSection";
import { AliasesSection } from "../../components/Admin.AliasesSection";
import {
  OnPasswordSubmit,
  PasswordSection,
  PasswordSectionType,
} from "../../components/PasswordSection";
import { getSample } from "../../store/Sample";
import { SampleSection } from "../../components/SampleSection";
import { $isValidAdminPassword, validateAdminPasswordRequest } from "../../store/Password";
import { OffpeakSection } from "../../components/OffpeakSection";
import { getOffpeak } from "../../store/Offpeak";
import { RulesSection } from "../../components/Admin.RulesSection";

export const AdminPage: FC = () => {
  const isAdmin = useStore($isValidAdminPassword);

  useEffect(() => {
    getSample();
    getOffpeak();
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
      <OffpeakSection />
      <AdmissibleStatusSection />
      <RulesSection />
      <Ability2Section />
      <AliasesSection />
    </>
  );
};
