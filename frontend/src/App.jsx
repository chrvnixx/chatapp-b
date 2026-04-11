import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/signup page/SignupPage";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="p-4 h-screen flex items-center justify-center ">
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <LoginPage /> : <HomePage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;
