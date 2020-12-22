import React, { lazy } from "react";
import { useAuth } from "./context/auth-context";
import { FullPageSpinner } from "./components/Lib";

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
const AuthScreen = lazy(() => import("./pages/AuthScreen"));

function App() {
  const { user } = useAuth();

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <AuthScreen />}
    </React.Suspense>
  );
}

export { App };
