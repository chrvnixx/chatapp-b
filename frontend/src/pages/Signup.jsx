import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";
import {
  FiArrowRight,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useAuthStore } from "../store/authStore";

export default function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signup = useAuthStore((state) => state.signup);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const navigate = useNavigate();

  const passwordMismatch =
    inputs.confirmPassword && inputs.password !== inputs.confirmPassword;

  async function handleSignup(e) {
    e.preventDefault();
    const { fullName, username, password, confirmPassword, gender } = inputs;

    if (!fullName.trim() || !username.trim() || !password.trim() || !gender) {
      toast.error("Fill in every field before you continue.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Your passwords need to match.");
      return;
    }

    try {
      await signup(fullName.trim(), username.trim(), password, gender);
      toast.success("Your account is ready.");
      navigate("/");
    } catch (signupError) {
      toast.error(
        signupError.response?.data?.message ?? "Couldn't create account.",
      );
    }
  }

  return (
    <div className="page-shell">
      <div className="auth-shell">
        <section className="auth-showcase glass-card flex flex-col justify-between gap-8">
          <div>
            <span className="brand-badge">
              <HiOutlineSparkles size={14} />
              Fresh workspace
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
              Set up a chat experience that feels sharp, modern, and easy to
              stay in.
            </h1>
            <p className="panel-subtitle mt-4 max-w-xl text-base">
              Create your profile once, get a generated avatar instantly, and
              step into a cleaner conversation layout.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <article className="feature-card">
              <span className="section-chip">
                <FiUser size={14} />
                Identity
              </span>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Full name, handle, and avatar are ready from the moment you sign
                up.
              </p>
            </article>
            <article className="feature-card">
              <span className="section-chip">
                <FiUsers size={14} />
                Team-ready
              </span>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Searchable contact lists and live presence make the next step
                effortless.
              </p>
            </article>
          </div>

          <div className="insight-card">
            <p className="text-sm font-semibold text-[var(--ink)]">
              What you get immediately
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="mt-1 text-[var(--teal)]" size={18} />
                <p className="text-sm leading-7 text-[var(--muted)]">
                  A profile picture generated from your username.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="mt-1 text-[var(--teal)]" size={18} />
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Direct access to the refreshed chat dashboard after sign up.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="mt-1 text-[var(--teal)]" size={18} />
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Cleaner forms with inline validation and clearer next steps.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-panel glass-card">
          <div>
            <span className="section-chip">Create your account</span>
            <h2 className="mt-4 text-3xl font-semibold">Join LockIn Chat</h2>
            <p className="panel-subtitle mt-3">
              A quick setup and you&apos;re ready to start messaging.
            </p>
          </div>

          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            <label className="field-shell">
              <span className="field-label">Full name</span>
              <input
                type="text"
                className="field-input"
                placeholder="Ada Lovelace"
                value={inputs.fullName}
                onChange={(e) => {
                  clearError();
                  setInputs({ ...inputs, fullName: e.target.value });
                }}
              />
            </label>

            <label className="field-shell">
              <span className="field-label">Username</span>
              <input
                type="text"
                className="field-input"
                placeholder="adal"
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
                  placeholder="Create a password"
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

            <label className="field-shell">
              <span className="field-label">Confirm password</span>
              <div className="flex items-center gap-3">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="field-input"
                  placeholder="Repeat your password"
                  value={inputs.confirmPassword}
                  onChange={(e) => {
                    clearError();
                    setInputs({ ...inputs, confirmPassword: e.target.value });
                  }}
                />
                <button
                  type="button"
                  className="text-sm font-semibold text-[var(--primary-deep)]"
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </label>

            <div className="space-y-3">
              <span className="field-label">Select gender</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {["male", "female"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`choice-card ${inputs.gender === option ? "choice-card--active" : ""}`}
                    onClick={() => setInputs({ ...inputs, gender: option })}
                  >
                    <p className="font-semibold capitalize text-[var(--ink)]">
                      {option}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      Use this selection to complete your profile.
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {passwordMismatch ? (
              <div className="status-banner status-banner--error">
                Password and confirmation need to match.
              </div>
            ) : null}

            {error ? (
              <div className="status-banner status-banner--error">{error}</div>
            ) : null}

            <button
              type="submit"
              className="primary-button w-full justify-center"
              disabled={isLoading || passwordMismatch}
            >
              {isLoading ? (
                <BarLoader color="#ffffff" width={72} />
              ) : (
                <>
                  Create account
                  <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="panel-subtitle mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[var(--primary-deep)] hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
