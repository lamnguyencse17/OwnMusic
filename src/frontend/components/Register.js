import React from "react";
import { Formik } from "formik";
import { createRegisterRequest } from "../requests/user";
import { validateCreateUser } from "../validators/userValidator";
import "../assets/Registerstyle.css"
const validateRegisterForm = (values) => {
  const { email, password, name, password2 } = values;
  const { status, message } = validateCreateUser({
    email,
    password,
    name,
    password2,
  });
  if (status === false) {
    if (
      message.email !== "" ||
      message.password !== "" ||
      message.password2 !== "" ||
      message.name !== ""
    ) {
      return { ...message };
    }
  }
  return {};
};

const submitRegisterForm = async (values, setSubmitting) => {
  setSubmitting(true);
  const { email, password, name } = values;
  const { status, token, message } = createRegisterRequest({
    email,
    password,
    name,
  });
  setSubmitting(false);
  if (!status) {
    console.error(message);
  } else {
    // Set User Here
  }
};

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="signup">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-indigo-700">
            Register
          </h2>
          <h3 className=" text-center text-gray-900">and chill the music by your own way</h3>
        </div>
        <Formik
          initialValues={{ email: "", password: "", name: "", password2: "" }}
          validate={(values) => validateRegisterForm(values)}
          onSubmit={(values, { setSubmitting }) =>
            submitRegisterForm(values, setSubmitting)
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
              <div className=" rounded-md shadow-sm">
                <div className= "signup__field">
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="signup__input"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    value={values.name}
                  />
                   <label class="signup__label" for="name">Username</label>
                   <div class= "failmess" >  {errors.name && touched.name && errors.name}</div>
                </div>
                <div className= "signup__field">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="signup__input"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    value={values.email}
                  />
                   <label class="signup__label" for="email">Email address</label>
                   <div class= "failmess" > {errors.email && touched.email && errors.email}</div>
                </div>
                <div className= "signup__field">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="signup__input"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    value={values.password}
                  />
                   <label class="signup__label" for="password">Password</label>
                   <div class= "failmess" >
                  {errors.password && touched.password && errors.password}
                  </div>
                </div>
                <div className= "signup__field">
                  <label htmlFor="password2" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    required
                    className="signup__input"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    value={values.password2}
                  />
                   <label class="signup__label" for="password2">Confirm your password</label>
                 <div class= "failmess" >
                  {errors.password2 && touched.password2 && errors.password2}
                  </div>
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
                  Sign in
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
