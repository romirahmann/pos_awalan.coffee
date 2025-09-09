/* eslint-disable no-unused-vars */
import { useAlert } from "../../store/AlertContext";
import { useAuth } from "../../store/useAuth";
import { Outlet, useRouter, useLocation } from "@tanstack/react-router";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const { showAlert } = useAlert();
  const router = useRouter();
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    // showAlert("error", "Please Login First!");
    router.navigate({
      to: "/login",
      search: { redirectTo: location.pathname },
    });
    return null;
  }

  return <Outlet />;
}
