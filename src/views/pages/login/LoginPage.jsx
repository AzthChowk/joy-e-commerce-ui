import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { $axios } from "../../../../lib/AxiosInstance";

import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="login-card">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          password: Yup.string().required("Required"),

          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values) => {
          try {
            const response = await $axios.post("/user/login", values);
            console.log(response);
            const accessToken = response.data.access_token;
            localStorage.setItem("userAccessToken", accessToken);
            const nameFromToken =
              response.data.user.firstName + " " + response.data.user.lastName;
            console.log(nameFromToken);
            localStorage.setItem("userName", nameFromToken);
            localStorage.setItem("isLoggedIn", true);

            localStorage.setItem("userId", response.data.user._id);
            const checkUserRole = response.data.user.role;
            navigate("/");
            console.log("Login Success.");
          } catch (error) {
            console.log({
              success: false,
              message: error.message,
            });
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Email"
              variant="standard"
              type="email"
              {...formik.getFieldProps("email")}
            />

            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            <TextField
              label="Password"
              variant="standard"
              type="password"
              {...formik.getFieldProps("password")}
            />

            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <button type="submit">Log In</button>
            <Link to="/register">
              <h4>No Account. Create one.</h4>
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
