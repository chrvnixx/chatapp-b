import React, { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { login, isLoading, error } = useAuthStore();
  const [passError, setPassError] = useState(false);

  async function handleSignin(e) {
    e.preventDefault();
    const{username, password} = inputs
    try {
      await login(username, password);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-orange-400/10 backdrop-blur-lg bg-clip-padding ">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={(e) => handleSignin(e)}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs, username:e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
               value={inputs.password}
              onChange={(e)=>setInputs({...inputs, password:e.target.value})}
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div className="flex justify-center">
            <button type="submit" className="btn btn-block btn-sm mt-4">
              Signin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
