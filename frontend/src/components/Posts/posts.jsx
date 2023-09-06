import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./posts.css";
import { format } from "date-fns";

const DateTimeDisplay = (dateTimeString) => {
  // Parse the input date string into a Date object
  const dateTime = new Date(dateTimeString);

  // Format the date and time as desired with AM/PM
  const formattedDateTime = format(dateTime, "yyyy-MM-dd hh:mm a");

  return formattedDateTime;
};

function Posts() {
  let navigate = useNavigate();
  const Username = useSelector((state) => state.user.value);
  const Token = useSelector((state) => state.token.value);

  useEffect(() => {
    if (typeof Username === "undefined") {
      localStorage.setItem("showErrorMessage", true);
      navigate("/login");
    }
  }, []);

  const { data, isLoading, isError, error } = useQuery(
    ["userData"],
    async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint you want to fetch data from.
        const response = await axios.get("http://127.0.0.1:8000/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${Token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred");
      }
    }
  );
  console.log(data);

  return (
    <>
      {isLoading ? (
        <>
          <div className="loading-circle"></div>
          <p>Loading...</p>
        </>
      ) : (
        data.map((post) => (
          <>
            <div className="card mb-3" style={{ width: "800px" }}>
              {post.images && post.images.length > 0 && (
                <img src={post.images[0]} className="card-img-top" alt="..." />
              )}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.text}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="submit"
                      className="btn btn-sm btn-outline-secondary btn-success like-btn"
                    >
                      <span>&#x1F44D;</span> Likes: {post.likes.length}
                    </button>

                    <button
                      type="submit"
                      className="btn btn-sm btn-outline-secondary btn-danger dislike-btn"
                    >
                      <span>&#x1F44E;</span> Dislikes: {post.dislikes.length}
                    </button>

                    <a href="#" className="btn btn-sm btn-outline-secondary">
                      Comments
                    </a>
                  </div>
                </div>
                <br />
                <p className="card-text">
                  <small className="text-body-secondary">
                    Posted by <Link to="#">{post.author}</Link> on{" "}
                    {DateTimeDisplay(post.created_date)}
                  </small>
                </p>
              </div>
            </div>
          </>
        ))
      )}
    </>
  );
}
export default Posts;
