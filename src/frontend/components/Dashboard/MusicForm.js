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
    <div className="w-full bg-white rounded-xl shadow-lg p-8 m-16 md:max-w-sm md:mx-auto">
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
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <input
                className="border py-2 px-3 text-grey-darkest"
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
            <div className="flex flex-col mb-4">
              <input
                className="border py-2 px-3 text-grey-darkest"
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
            <div className="flex flex-col mb-4">
              <input
                className="border py-2 px-3 text-grey-darkest"
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
            <div className="flex flex-col mb-4">
              <input
                className="border py-2 px-3 text-grey-darkest"
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
            <div className="flex flex-col mb-4">
              <input
                className="border py-2 px-3 text-grey-darkest"
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
            <div className="flex flex-col mb-4">
              <input
                className="border py-2 px-3 text-grey-darkest"
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
                className="block bg-yellow-600 hover:bg-yellow-400 text-white uppercase text-lg mx-auto p-4 rounded"
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
