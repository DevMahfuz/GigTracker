import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useParams } from "react-router-dom";

function deleteProject(id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: id,
  });

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let updateURL = `http://localhost:5000/delete/${id}`;
  fetch(updateURL, requestOptions)
    .then((response) => response.json())
    .then((result) => alert(JSON.stringify(result, null, 2)))
    .catch((error) => alert(JSON.stringify(error, null, 2)));
}

export default function Project() {
  let { id } = useParams();
  const [project, setProject] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    let url = `http://localhost:5000/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setProject(result);
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
        setIsFetching(true);
      });
  }, [id]);
  console.log(project);
  return (
    <main className="container">
      {!isFetching ? (
        <div>
          <h1>{project.project.name}</h1>

          <Formik
            initialValues={{
              name: project.project.name || "",
              c_name: project.project.c_name || "",
              description: project.project.description || "",
              rate: project.project.rate || "",
              start_date: project.project.start_date || "",
              end_date: project.project.end_date || "",
              note: project.project.note || "",
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
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };
              let updateURL = `http://localhost:5000/update/${id}`;
              fetch(updateURL, requestOptions)
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
                  {errors.name && touched.name && errors.name}
                </div>

                <div className="form-field">
                  <label htmlFor="c_name">Client Name</label>
                  <input
                    type="text"
                    name="c_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.c_name}
                  />
                  {errors.c_name && touched.c_name && errors.c_name}
                </div>

                <div className="form-field">
                  <label htmlFor="description">Project Description</label>
                  <textarea
                    type="text"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />

                  {errors.description &&
                    touched.description &&
                    errors.description}
                </div>

                <div className="form-field">
                  <label htmlFor="rate">Price Rate ($) </label>
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
                    placeholder={values.start_date}
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
                  />
                  {errors.note && touched.note && errors.note}
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Update Project
                </button>
              </form>
            )}
          </Formik>
          <button onClick={() => deleteProject(project.project.id)}>
            Delet Project
          </button>
        </div>
      ) : (
        <h2>loading</h2>
      )}
    </main>
  );
}
