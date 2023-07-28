import React, { useContext, useEffect, useState } from "react";
import { Base } from "../core/Base";
import { ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, sendOtp, signup } from "../auth/helper";

import toast from "react-hot-toast";
import { MyContext } from "../context/createContext";

const Signup = () => {
  const { signupData, setSignupData } = useContext(MyContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
    otp: "",
    address: "",
    pincode: "",
    error: "",
    success: false,
  });
  const {
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
    role,
    otp,
    address,
    pincode,
  } = values;

  const handelChange = (name) => (event) => {
    setValues({ ...values, success: false, [name]: event.target.value });
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    setSignupData({
      name,
      email,
      password,
      confirmPassword,
      phoneNumber,
      role: "admin",
      otp,
      address,
      pincode,
    });
    sendOtp(values.email)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          if (data.success === false) {
            toast.error(data.message);
          } else {
            toast.success(data.message);
            navigate("/otp");
          }
        }
      })
      .catch((error) => {
        console.log("Error in Sending OTP");
        toast.error("Error in Sending OTP");
      });
  };

  const [authToken, setAuthToken] = useState("");
  isAuthenticated()
    .then((user) => setAuthToken(user.token))
    .catch((error) => console.log(error));

  useEffect(() => {
	if(authToken){
		navigate('/')
	}
  }, [authToken]);

  function SignupForm() {
    return (
      // <Base>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign up
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Already have an account?{" "}
                <NavLink
                  to={"/signin"}
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                  Sign In
                </NavLink>
              </p>
              <form action="#" method="POST" className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Full Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Full Name"
                        id="name"
                        value={name}
                        onChange={handelChange("name")}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={handelChange("email")}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={handelChange("password")}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="confirmPassword"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Confirm Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handelChange("confirmPassword")}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="phoneNumber"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Phone Number{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="number"
                        placeholder="Phone Number"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handelChange("phoneNumber")}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="address"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Address{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Address"
                        id="address"
                        value={address}
                        onChange={handelChange("address")}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="pincode"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Pin Code{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="number"
                        placeholder="Pin Code"
                        id="pincode"
                        value={pincode}
                        onChange={handelChange("pincode")}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      onClick={handelSubmit}
                    >
                      Create Account <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-3 space-y-3"></div>
            </div>
          </div>
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
              alt=""
            />
          </div>
        </div>
      </section>
      // {/* </Base> */}
    );
  }
  return SignupForm();
};
export default Signup;
