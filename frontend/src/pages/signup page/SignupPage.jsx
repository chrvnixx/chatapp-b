import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { BarLoader } from "react-spinners";

export default function SignupPage() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [passMatch, setPassMatch] = useState(false);

  const { isLoading, error, signup } = useAuthStore();

  const navigate = useNavigate();

  function handleCheckboxChange(gender) {
    setInputs({ ...inputs, gender });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { fullName, username, password, gender, confirmPassword } = inputs;
      if (confirmPassword !== password) {
        return setPassMatch(true);
      }
      await signup(fullName, username, password, gender);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-orange-400/10 backdrop-blur-lg bg-clip-padding ">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full name"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
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
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="text-error font-bold">
            {passMatch ? "passwords do not match" : ""}
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div className="flex justify-center text-error font-bold">
            {error}
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn btn-block btn-sm mt-4">
              {isLoading ? <BarLoader color="white" /> : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
