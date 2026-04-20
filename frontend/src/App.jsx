import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="loading-screen">
        <div className="loading-card glass-card">
          <span className="section-chip">LockIn</span>
          <h1 className="mt-4 text-3xl font-semibold">
            Bringing your workspace online
          </h1>
          <p className="mt-3 max-w-md text-sm text-[var(--muted)]">
            We&apos;re checking your session, syncing presence, and preparing
            the chat view.
          </p>
          <div className="mt-6">
            <BarLoader color="#ff7a59" width={180} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-stage">
      <div className="ambient-orb ambient-orb--one" />
      <div className="ambient-orb ambient-orb--two" />
      <div className="ambient-orb ambient-orb--three" />
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
