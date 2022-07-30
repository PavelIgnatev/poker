import { useStore } from "effector-react";
import React, { FC, useEffect } from "react";

import { Ability2Section } from "../../components/Admin.Ability2Section";
import { AdmissibleStatusSection } from "../../components/Admin.AdmissibleStatusSection";
import { AliasesSection } from "../../components/Admin.AliasesSection";
import {
  OnPasswordSubmit,
  PasswordSection,
  PasswordSectionType,
} from "../../components/PasswordSection";
import { getSample } from "../../store/Sample";
import { SampleSection } from "../../components/SampleSection2";
import { $isValidAdminPassword, validateAdminPasswordRequest } from "../../store/Password";

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
      <AdmissibleStatusSection />
      <Ability2Section />
      <AliasesSection />
    </>
  );
};
