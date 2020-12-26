import React, { useState } from "react";
import { Formik } from "formik";
import { createArtistLoginRequest } from "../requests/user";
import { validateLogInUser } from "../validators/userValidator";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/user";
import { useHistory } from "react-router-dom";
import "../assets/Registerstyle.css"
const validateLoginForm = (values) => {
  const { email, password } = values;
  const { status, message } = validateLogInUser({ email, password });
  if (status === false) {
    if (message.email !== "" || message.password !== "") {
      return { ...message };
    }
  }
};
export default function LoginArtist() {
  const dispatch = useDispatch();
  const history = useHistory();
  const submitLoginForm = async (values, setSubmitting) => {
    setSubmitting(true);
    const { email, password } = values;
    const { status, token, message } = await createArtistLoginRequest({
      email,
      password,
    });
    if (!status) {
      setSubmitting(false);
      setError(message);
    } else {
      const result = dispatch(setUser({ token, type: "artist" }));
      if (!result) {
        setSubmitting(false);
        setError("Something went wrong");
        return;
      }
      history.push("/");
    }
  };
  const [error, setError] = useState("");
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="signuptheme">
        <div>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-indigo-700">
           Sign in as artist 
          </h2>
          <h3 className=" text-center text-gray-900">and make your own music go viral</h3>
          {error === "" ? <></> : <h3>{error}</h3>}
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => validateLoginForm(values)}
          onSubmit={async (values, { setSubmitting }) =>
            await submitLoginForm(values, setSubmitting)
          }
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div className= "signup__fieldtheme">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="signup__inputtheme"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    value={values.email}
                  /> 
                  <label className="signup__labeltheme" htmlFor="email">Email address</label>
                  <div className= "failmesstheme" >{errors.email && touched.email && errors.email}</div>
                </div>
                <div className= "signup__fieldtheme">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="signup__inputtheme"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    value={values.password}
                  />
                  <label className="signup__labeltheme" htmlFor="password">Password</label>
                  <div className= "failmesstheme" >{errors.password && touched.password && errors.password}</div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Log in
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
