import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

function App() {
  const { isAuthenticated, isCheckingAuth, checkAuth } =
    useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <BarLoader />
      </div>
    );
  }

  return (
    <div className="bg-gray-600">
      <Routes>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={!isAuthenticated ? <Navigate to="/login" /> : <HomePage />}
        />
      </Routes>
    </div>
  );
}

export default App;
