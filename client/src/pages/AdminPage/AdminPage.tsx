import { useStore } from "effector-react";
import { FC } from "react";
import { AdminAbilitySection } from "../../components/AdminAbilitySection";
import { PasswordSection } from "../../components/PasswordSection";
import { $isValidAdminPassword, validateAdminPasswordRequest } from "../../store/Password";
import { $password } from "../../store/Password";

export const AdminPage: FC = () => {
  const password = useStore($password);
  const isAdmin = useStore($isValidAdminPassword);

  const handlePasswordSubmit = () => validateAdminPasswordRequest(password);

  return (
    <>
      {isAdmin ? (
        <>
          <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
          <AdminAbilitySection />
        </>
      ) : (
        <PasswordSection onSubmit={handlePasswordSubmit} />
      )}
    </>
  );
};
