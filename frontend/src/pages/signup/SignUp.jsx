import React from "react";
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            SignUp
            <span className="text-blue-500">ChatApp</span>
          </h1>

          <form>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Hein Htet"
                className="w-full input input-bordered h-10"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="heinhtet"
                className="w-full input input-bordered h-10"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full input input-bordered h-10"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Confirm</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full input input-bordered h-10"
              />
            </div>

            {/* Gender CheckBox Goes Here */}
            <div className="mt-2">
              <GenderCheckbox />
            </div>

            <a
              href="#"
              className="text-sm hover:underline hover:text-blue-600 pl-2 mt-2 inline-block"
            >
              Already have an account
            </a>

            <div>
              <button className="btn btn-block btn-sm mt-2">SignUp</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
