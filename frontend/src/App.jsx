import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/signup page/SignupPage";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const App =  () => {
  const { isAuthenticated, isCheckingAuth, checkAuth, user } = useAuthStore();

  useEffect(() => {
     checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex justify-center items-center">
        <BarLoader />
      </div>
    );
  }

  return (
    <div className="p-4 h-screen flex items-center justify-center ">
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <Navigate to="/login" /> : <HomePage />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
