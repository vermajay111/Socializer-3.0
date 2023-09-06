import { token_refresh } from "../../slices/TokenSlice";
import { user_refresh } from "../../slices/UserSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import webLogo from "../../assets/web_logo_1.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Cookies from "js-cookie";
import * as yup from "yup";
import axios from "axios";
import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const [failed, change_fail] = useState("");
  let navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().max(30).required("Username is required"),
    password: yup.string().min(6).max(20).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const mutation = useMutation(
    (userData) =>
      axios.post("http://127.0.0.1:8000/users/login", userData, {
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
        dispatch(user_refresh());
        dispatch(token_refresh());
        localStorage.removeItem("showErrorMessage");
        navigate("/posts");
      },
      onError: (error) => {
        console.log(error);
        change_fail("Username or password is incorrect. Please try again!");
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
        <>
        
          {localStorage.getItem("showErrorMessage") === 'true' && (
            <div className="alert alert-danger" role="alert">
              Login Or Signup before looking at posts!
            </div>
          )}
          <div className="signupFrm">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <img
                src={webLogo}
                width={250}
                height={180}
                style={{ margin: "20px" }}
              />
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Login
              </h2>

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

              <p className="text-danger">{failed}</p>
              <input type="submit" className="submitBtn" value="Login" />
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
