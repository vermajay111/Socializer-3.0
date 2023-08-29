import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { user_refresh } from "../../slices/UserSlice";
import { token_refresh } from "../../slices/TokenSlice";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  const [logged_out, setLogged_out] = useState(false);

  const logout_user = () => {
    const user_token = Cookies.get("token");
    const username = Cookies.get("username");
    if (typeof username !== "undefined" && typeof user_token !== "undefined") {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${user_token}`,
        },
      };

      axios
        .post("http://127.0.0.1:8000/users/logout", {}, config)
        .then((response) => {
          Cookies.remove("token");
          Cookies.remove("username");
          dispatch(user_refresh());
          dispatch(token_refresh());
          setLogged_out(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    logout_user();
  }, []);

  return (
    <>
      {logged_out === true ? (
        <h1>Thanks For Joining! Please Come Again 😊</h1>
      ) : (
        <h1>Could not log out</h1>
      )}
    </>
  );
}

export default Logout;
