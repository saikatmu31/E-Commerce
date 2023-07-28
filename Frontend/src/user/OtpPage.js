import React, { useContext, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { isAuthenticated, signup } from "../auth/helper";
import { MyContext } from "../context/createContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function OtpPage() {
  const [otp, setOtp] = useState("");
  const { signupData, setSignupData } = useContext(MyContext);
  const navigate = useNavigate();
  const handelSubmit = (event) => {
    event.preventDefault();
    signup({ ...signupData, otp: otp })
      .then((data) => {
        console.log("DATA from API", data);
        if (data.error) {
          // setValues({ ...values, error: data.error, success: false });
          navigate("/signup");
          toast.error("Error in Signup");
        } else {
          setOtp("");
          if (data.success === false) {
            toast.error(data.message);
          } else if (data.success === true) {
            toast.success(data.message);
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.log("Error in Signup", {
          duration: 4000,
          position: "top-center",
        });
      });
  };

  const [authToken, setAuthToken] = useState("");
  isAuthenticated()
    .then((user) => setAuthToken(user.token))
    .catch((error) => console.log(error));

  useEffect(() => {
    if (authToken) {
      navigate("/");
    }
  }, [authToken]);
  return (
    <div>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email ba**@dipainhouse.com</p>
              </div>
            </div>

            <div>
              <form action="" method="post">
                <div className="flex flex-col space-y-16">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => (
                      <input
                        {...props}
                        placeholder=""
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[48px] lg:w-[60px] border-1 border-slate-700
                                                bg-slate-200
												bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-1 border-slate-700focus:outline-2 focus:outline-yellow-50"
                      />
                    )}
                    containerStyle={{
                      justifyContent: "space-between",
                      gap: "0 6px",
                    }}
                  />
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        onClick={handelSubmit}
                      >
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;
