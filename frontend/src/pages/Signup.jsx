import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { BarLoader } from "react-spinners";

export default function Signup() {
  const [passError, setPassError] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { signup, isLoading, error } = useAuthStore();

  async function handleSignup(e) {
    e.preventDefault();
    const { fullName, username, password, confirmPassword, gender } = inputs;
    if (password !== confirmPassword) {
      return setPassError(true);
    }
    try {
      await signup(fullName, username, password, gender);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen my-auto">
      <div className="card w-100 h-150 bg-gray-400 flex items-center p-2   ">
        <p className="card-title text-2xl mb-8">Signup</p>

        <form onSubmit={handleSignup} className="form">
          <div className="mb-4">
            <label>Full Name</label>
            <input
              type="text"
              className="input"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label>Username</label>
            <input
              type="text"
              className="input "
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              type="text"
              className="input "
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label>Confirm password</label>
            <input
              type="text"
              className="input "
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />

            {/* gender checkbox */}
          </div>

          <div className="">
            <label>Gender</label>
            <div className="flex gap-2">
              <div className="flex flex-col items-center">
                <label>male</label>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={inputs.gender === "male"}
                  onChange={() => setInputs({ ...inputs, gender: "male" })}
                />
              </div>
              <div className="flex flex-col items-center">
                <label>female</label>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={inputs.gender === "female"}
                  onChange={() => setInputs({ ...inputs, gender: "female" })}
                />
              </div>
            </div>
          </div>
          <p className="mt-2">Already have an account?</p>
          <div className="flex justify-center text-error"></div>
          <div className="flex justify-center text-error font-semi-bold">
            {error}
          </div>
          <div className="flex justify-center mt-2">
            <button type="submit" className="btn btn-accent">
              {isLoading ? <BarLoader /> : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
