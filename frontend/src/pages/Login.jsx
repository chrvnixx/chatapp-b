import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { useConversation } from "../store/conversation";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { conversations, login, isLoading, error } = useAuthStore();
  const { setSelectedConvo } = useConversation();

  async function handleLogin(e) {
    e.preventDefault();
    const { username, password } = inputs;

    try {
      await login(username, password);
      await conversations();
      setSelectedConvo();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen my-auto">
      <div className="card w-100  bg-gray-400 flex items-center p-2   ">
        <p className="card-title text-2xl mb-8">Login</p>

        <form onSubmit={handleLogin} className="form">
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

          <p className="mt-2">Don't have an account?</p>

          <div className="flex justify-center text-error font-semi-bold">
            {error}
          </div>
          <div className="flex justify-center m-4">
            <button type="submit" className="btn btn-accent">
              {isLoading ? <BarLoader /> : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
