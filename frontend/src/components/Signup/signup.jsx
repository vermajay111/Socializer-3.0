import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./signup.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Signup() {
  let navigate = useNavigate();
  const schema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    username: yup.string().max(30).required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).max(20).required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const mutation = useMutation(
    (userData) =>
      axios.post("http://127.0.0.1:8000/users/signup", userData, {
        "Content-Type": "application/json",
      }),
    {
      onSuccess: (data) => {
        const apiToken = data.data.token;
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 60 * 1000);
        Cookies.set("token", apiToken, { expires: expirationDate });
        Cookies.set("username", data.data.user.username, {
          expires: expirationDate,
        });
        navigate("/posts");
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      {mutation.isLoading ? (
        <>
          <div className="loading-circle"></div>
          <p>Loading...</p>
        </>
      ) : (
        <div className="signupFrm">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="title">Sign up</h1>

            <div className="inputContainer">
              <input
                type="text"
                className="input"
                placeholder="a"
                {...register("first_name")}
              />
              <label className="label">First Name</label>
            </div>
            {errors.first_name && (
              <p className="text-danger">{errors.first_name.message}</p>
            )}

            <div className="inputContainer">
              <input
                type="text"
                className="input"
                placeholder="a"
                {...register("last_name")}
              />
              <label className="label">Last Name</label>
            </div>
            {errors.last_name && (
              <p className="text-danger">{errors.last_name.message}</p>
            )}

            <div className="inputContainer">
              <input
                type="text"
                className="input"
                placeholder="a"
                {...register("email")}
              />
              <label className="label">Email</label>
            </div>
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}

            <div className="inputContainer">
              <input
                type="text"
                className="input"
                placeholder="a"
                {...register("username")}
              />
              <label className="label">Username</label>
            </div>
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}

            <div className="inputContainer">
              <input
                type="password"
                className="input"
                placeholder="a"
                {...register("password")}
              />
              <label className="label">Password</label>
            </div>
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}

            <div className="inputContainer">
              <input
                type="password"
                className="input"
                placeholder="a"
                {...register("confirm_password")}
              />
              <label className="label">Confirm Password</label>
            </div>
            {errors.confirm_password && (
              <p className="text-danger">{errors.confirm_password.message}</p>
            )}

            <input type="submit" className="submitBtn" value="Sign up" />
          </form>
        </div>
      )}
    </>
  );
}

export default Signup;
