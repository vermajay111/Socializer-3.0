import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./signup.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { user_refresh } from "../../slices/UserSlice";
import { token_refresh } from "../../slices/TokenSlice";
import webLogo from "../../assets/web_logo_1.png";

function Signup() {
  const dispatch = useDispatch();
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
        dispatch(user_refresh());
        dispatch(token_refresh());
        localStorage.removeItem("showErrorMessage")
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
        <>
        {localStorage.getItem("showErrorMessage") === 'true' && (
          <div className="alert alert-danger" role="alert" style={{ marginTop: '120px' }}>
            Login Or Signup before looking at posts!
          </div>
        )}
        <div className="signupFrm">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <img src={webLogo} width={250} height={180} style={{ margin: '20px' }} />
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
            <div className="inputContainer" >
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
        </>
      )}
    </>
  );
}

export default Signup;
