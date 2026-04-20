import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";
import { FiArrowRight, FiEye, FiEyeOff, FiShield, FiUsers } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { RiChatSmile3Line } from "react-icons/ri";
import { useAuthStore } from "../store/authStore";
import { useConversation } from "../store/conversation";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const resetConversation = useConversation((state) => state.resetConversation);

  async function handleLogin(e) {
    e.preventDefault();
    const { username, password } = inputs;

    if (!username.trim() || !password.trim()) {
      toast.error("Enter both your username and password.");
      return;
    }

    try {
      await login(username.trim(), password);
      resetConversation();
      toast.success("Welcome back.");
      navigate("/");
    } catch (loginError) {
      toast.error(loginError.response?.data?.message ?? "Couldn't sign you in.");
    }
  }

  return (
    <div className="page-shell">
      <div className="auth-shell">
        <section className="auth-showcase glass-card flex flex-col justify-between gap-8">
          <div>
            <span className="brand-badge">
              <HiOutlineSparkles size={14} />
              LockIn Chat
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              A calmer chat space built for quick focus and warm conversations.
            </h1>
            <p className="panel-subtitle mt-4 max-w-xl text-base">
              Sign in to your workspace, keep an eye on who&apos;s online, and
              move through your conversations without noise.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <article className="feature-card">
              <span className="section-chip">
                <FiUsers size={14} />
                Presence
              </span>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                See which teammates are active before you open the thread.
              </p>
            </article>
            <article className="feature-card">
              <span className="section-chip">
                <FiShield size={14} />
                Session Safety
              </span>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Cookie-based auth keeps sign-in quiet and consistent.
              </p>
            </article>
          </div>

          <div className="insight-card">
            <p className="text-sm font-semibold text-[var(--ink)]">
              Today&apos;s flow
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-semibold">01</p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Sign in and sync your session.
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold">02</p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Filter the sidebar and spot active contacts.
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold">03</p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Jump into a polished chat workspace.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-panel glass-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="section-chip">Welcome back</span>
              <h2 className="mt-4 text-3xl font-semibold">Sign in</h2>
              <p className="panel-subtitle mt-3">
                Pick up the conversation right where you left it.
              </p>
            </div>
            <div className="hidden h-14 w-14 items-center justify-center rounded-[20px] bg-[rgba(255,122,89,0.12)] text-[var(--primary-deep)] sm:flex">
              <RiChatSmile3Line size={24} />
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <label className="field-shell">
              <span className="field-label">Username</span>
              <input
                type="text"
                className="field-input"
                placeholder="Enter your username"
                value={inputs.username}
                onChange={(e) => {
                  clearError();
                  setInputs({ ...inputs, username: e.target.value });
                }}
              />
            </label>

            <label className="field-shell">
              <span className="field-label">Password</span>
              <div className="flex items-center gap-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className="field-input"
                  placeholder="Enter your password"
                  value={inputs.password}
                  onChange={(e) => {
                    clearError();
                    setInputs({ ...inputs, password: e.target.value });
                  }}
                />
                <button
                  type="button"
                  className="text-sm font-semibold text-[var(--primary-deep)]"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </label>

            {error ? (
              <div className="status-banner status-banner--error">{error}</div>
            ) : null}

            <button
              type="submit"
              className="primary-button w-full justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <BarLoader color="#ffffff" width={72} />
              ) : (
                <>
                  Enter workspace
                  <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="panel-subtitle mt-6 text-sm">
            New here?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[var(--primary-deep)] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
