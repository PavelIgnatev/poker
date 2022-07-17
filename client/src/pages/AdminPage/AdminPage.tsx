import { useStore } from "effector-react";
import { FC } from "react";
import { AdminAbilitySection } from "../../components/AdminAbilitySection";
import { PasswordSection } from "../../components/PasswordSection";
import { $isValidPassword } from "../../store/Password";

export const AdminPage: FC = () => {
  const isValidPassword = useStore($isValidPassword);

  return (
    <>
      {isValidPassword ? (
        <>
          <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
          <AdminAbilitySection />
        </>
      ) : (
        <PasswordSection />
      )}
    </>
  );
};
