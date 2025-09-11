/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { AuthProvider } from "./store/AuthContext";
import { router } from "./routes/Routes";
import { RouterProvider } from "@tanstack/react-router";
import { AlertProvider } from "./store/AlertContext";
import { connectSocket } from "./services/socket.service";

function App() {
  useEffect(() => {
    const handleUnauthorized = () => {
      router.navigate({ to: "/login" });
    };
    connectSocket();
    window.addEventListener("unauthorized", handleUnauthorized);
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, []);

  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AlertProvider>
    </>
  );
}

export default App;
