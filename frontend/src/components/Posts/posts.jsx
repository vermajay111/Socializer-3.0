import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import "./posts.css";
import { format } from "date-fns";

const DateTimeDisplay = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const formattedDateTime = format(dateTime, "yyyy-MM-dd hh:mm a");
  return formattedDateTime;
};

function Posts() {
  let navigate = useNavigate();
  const [likes_dislikes_log, like_post_mutate_log] = useState({});
  const [btn_color, change_colors] = useState([]);
  const Username = useSelector((state) => state.user.value);
  const Token = useSelector((state) => state.token.value);

  useEffect(() => {
    if (typeof Username === "undefined") {
      localStorage.setItem("showErrorMessage", true);
      navigate("/login");
    }
  }, []);

  const { data, isLoading } = useQuery(["posts"], async () => {
    try {
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
  });

  const likePostMutation = useMutation(
    (postId) => {
      const payload = { pk: postId }; // Create the JSON payload
      return axios.post(
        `http://127.0.0.1:8000/like_post`,
        payload, // Use the payload here
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${Token}`,
          },
        }
      );
    },
    {
      onError: (error) => {
        console.error("Error:", error);
      },
      onSuccess: (data, postId) => {
        // Use square brackets to create a dynamic property with postId as the key
        like_post_mutate_log({ ...likes_dislikes_log, [postId]: data.data });
      },
    }
  );

  const DislikePostMutation = useMutation(
    (postId) =>
      axios.post(
        `http://127.0.0.1:8000/dislike_post`,
        { pk: postId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${Token}`,
          },
        }
      ),
    {
      onError: (error) => {
        console.error("Error:", error);
      },
      onSuccess: (data, postId) => {
        like_post_mutate_log({ ...likes_dislikes_log, [postId]: data.data });
      },
    }
  );

  return (
    <>
      {isLoading ? (
        <>
          <div className="loading-circle"></div>
          <p>Loading...</p>
        </>
      ) : (
        <div style={{ marginTop: 500 }}>
          {data.map((post, index) => (
            <div
              key={post.id}
              className={`card mb-3 ${index === 0 ? "mt-5" : ""}`}
              style={{ width: "750px" }}
            >
              {post.images && post.images.length > 0 && (
                <img
                  src={`http://127.0.0.1:8000/${post.images[0].image}`}
                  className="card-img-top"
                  alt="ImageLoadingError"
                  height={600}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.text}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      onClick={() => likePostMutation.mutate(post.id, index)}
                      className={`btn btn-sm btn-success ${
                        
                          ? "make_green"
                          : "btn-outline-secondary"
                      }`}
                    >
                      <span>&#x1F44D;</span> Likes:{" "}
                      {likes_dislikes_log.hasOwnProperty(post.id)
                        ? likes_dislikes_log[post.id].likes.length
                        : post.likes.length}
                    </button>

                    <button
                      type="submit"
                      className={`btn btn-sm btn-danger dislike-btn ${
                        post.dislikes.includes(Username)
                          ? "make_dislike"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => {
                        DislikePostMutation.mutate(post.id);
                      }}
                    >
                      <span>&#x1F44E;</span> Dislikes:{" "}
                      {likes_dislikes_log.hasOwnProperty(post.id)
                        ? likes_dislikes_log[post.id].dislikes.length
                        : post.dislikes.length}
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
          ))}
        </div>
      )}
    </>
  );
}

export default Posts;
