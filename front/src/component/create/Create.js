import React from "react";
import { Formik } from "formik";

const Create = () => (
  <main className="container">
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{
        name: "",
        c_name: "",
        description: "",
        rate: "5",
        start_date: "",
        end_date: "",
        note: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.c_name) {
          errors.c_name = "Required";
        }
        if (!values.start_date) {
          errors.start_date = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          name: values.name,
          rate: values.rate,
          start_date: values.start_date,
          end_date: values.end_date,
          description: values.description,
          note: values.note,
          c_name: values.c_name,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:5000/create", requestOptions)
          .then((response) => response.json())
          .then((result) => alert(JSON.stringify(result, null, 2)))
          .catch((error) => alert(JSON.stringify(error, null, 2)));

        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <p>{errors.name && touched.name && errors.name}</p>
          </div>
          <div className="form-field">
            <label htmlFor="name">Cliend Name</label>
            <input
              type="text"
              name="c_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.c_name}
            />
            <p>{errors.c_name && touched.c_name && errors.c_name}</p>
          </div>

          <div className="form-field">
            <label htmlFor="description">Project Description</label>
            <textarea
              type="text"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            >
              Enter text here...
            </textarea>
            <p>
              {errors.description && touched.description && errors.description}
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="rate">Price Rate ($)</label>
            <input
              type="number"
              name="rate"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rate}
            />
            {errors.rate && touched.rate && errors.rate}
          </div>

          <div className="form-field">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              name="start_date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.start_date}
            />
            {errors.start_date && touched.start_date && errors.start_date}
          </div>

          <div className="form-field">
            <label htmlFor="end_date">End Date</label>
            <input
              type="date"
              name="end_date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.end_date}
            />
            {errors.end_date && touched.end_date && errors.end_date}
          </div>

          <div className="form-field">
            <label htmlFor="note">Project Note</label>
            <textarea
              type="text"
              name="note"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.note}
            >
              note...
            </textarea>
            {errors.note && touched.note && errors.note}
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </main>
);

export default Create;
