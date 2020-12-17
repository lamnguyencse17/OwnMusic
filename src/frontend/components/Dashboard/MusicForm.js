import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions/user";
import { createMusicRequest } from "../../requests/music";

const validateMusicForm = (values) => {
  // const { email, password, name, password2 } = values;
  // const { status, message } = validateCreateUser({
  //   email,
  //   password,
  //   name,
  //   password2,
  // });
  // if (status === false) {
  //   if (
  //     message.email !== "" ||
  //     message.password !== "" ||
  //     message.password2 !== "" ||
  //     message.name !== ""
  //   ) {
  //     return { ...message };
  //   }
  // }
  return {};
};

export default function MusicForm() {
  const dispatch = useDispatch();
  const submitMusicForm = async (values, setSubmitting) => {
    console.log(values);
    setSubmitting(true);
    const { status, music, message } = await createMusicRequest(values);
    setSubmitting(false);
    if (!status) {
      console.error(message);
    } else {
      dispatch(setUser({ token: null, type: "artist" }));
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          description: "",
          demoURL: "",
          coverURL: "",
          downloadURL: "",
          price: 0,
        }}
        // validate={(values) => validateMusicForm(values)}
        onSubmit={(values, { setSubmitting }) =>
          submitMusicForm(values, setSubmitting)
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
          <form onSubmit={handleSubmit}>
            <div>
              <input
                placeholder="Name"
                id="name"
                type="name"
                name="name"
                disabled={isSubmitting}
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name && errors.name}
            </div>
            <div>
              <input
                placeholder="Description"
                id="description"
                type="name"
                name="description"
                disabled={isSubmitting}
                value={values.description}
                onChange={handleChange}
              />
              {errors.description && touched.description && errors.description}
            </div>
            <div>
              <input
                placeholder="Cover URL"
                id="coverURL"
                type="name"
                name="coverURL"
                disabled={isSubmitting}
                value={values.coverURL}
                onChange={handleChange}
              />
              {errors.coverURL && touched.coverURL && errors.coverURL}
            </div>
            <div>
              <input
                placeholder="Demo URL"
                id="demoURL"
                type="name"
                name="demoURL"
                disabled={isSubmitting}
                value={values.demoURL}
                onChange={handleChange}
              />
              {errors.demoURL && touched.demoURL && errors.demoURL}
            </div>
            <div>
              <input
                placeholder="Download URL"
                id="downloadURL"
                type="name"
                name="downloadURL"
                disabled={isSubmitting}
                value={values.downloadURL}
                onChange={handleChange}
              />
              {errors.downloadURL && touched.downloadURL && errors.downloadURL}
            </div>
            <div>
              <input
                id="price"
                type="number"
                name="price"
                disabled={isSubmitting}
                value={values.price}
                onChange={handleChange}
              />
              {errors.price && touched.price && errors.price}
            </div>
            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                Create Music
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
