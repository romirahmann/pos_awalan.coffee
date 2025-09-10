/* eslint-disable no-unused-vars */
import { useAuth } from "../../store/useAuth";

export function Homepage() {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <h1>DASHBOARD</h1>
    </>
  );
}
