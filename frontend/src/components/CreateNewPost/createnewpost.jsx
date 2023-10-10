import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./createnewpost.css"

const CreateNewPost = () => {
  const Token = useSelector((state) => state.token.value);
  let navigate = useNavigate();
  const schema = yup.object().shape({
    PostTitle: yup
      .string()
      .max(150, "A title can have at most 150 characters")
      .required("A title is required"),
    PostContent: yup
      .string()
      .min(6, "Post content must be at least 6 characters")
      .max(100000, "Post content can have at most 100,000 characters")
      .required("Post content is required"),
    Images: yup
      .array()
      .test("maxImages", "You can upload a maximum of 10 images", (value) => {
        return !value || value.length <= 10;
      }),
    Video: yup
      .mixed()
      .test("fileSize", "The video file is too large", (value) => {
        if (!value || !value[0]) return true; // Allow empty video field
        return value[0].size <= 10737418240; // 10GB file size limit for the video
      })
      .test("fileType", "Only video files are allowed", (value) => {
        if (!value || !value[0]) return true; // Allow empty video field
        return ["video/mp4", "video/webm", "video/mpeg"].includes(
          value[0].type
        );
      })
      .nullable(),
  });

  const mutation = useMutation(
    (formData) => {
      const data = new FormData();
      data.append("PostTitle", formData.PostTitle);
      data.append("PostContent", formData.PostContent);
      if (formData.Images && formData.Images.length > 0) {
        formData.Images.forEach((image, index) => {
          data.append(`Images[${index}]`, image);
        });
      }
      if (formData.Video && formData.Video.length > 0) {
        data.append("Video", formData.Video[0]);
      }

      return axios.post("http://127.0.0.1:8000/create_new_post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      });
    },
    {
      onSuccess: (data) => { 
        navigate("/posts");
        console.log(data);
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const limitedFiles = selectedFiles.slice(0, 10); // Limit to 10 images
    register("Images").onChange(limitedFiles);
  };

  return (
    <div>
      {mutation.isLoading ? (
        <>
          <div className="loading-circle"></div>
          <p>Loading...</p>
        </>
      ) : (
        <div>
          <h1>Create A New Post</h1>
          <form onSubmit={handleSubmit(mutation.mutate)} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="PostTitle" className="form-label">
                Post Title
              </label>
              <input
                type="text"
                className="form-control"
                id="PostTitle"
                placeholder="Enter a title"
                {...register("PostTitle")}
              />
              {errors.PostTitle && (
                <p className="text-danger">{errors.PostTitle.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="PostContent" className="form-label">
                Post Content
              </label>
              <textarea
                className="form-control"
                id="PostContent"
                rows="3"
                placeholder="Enter Something Beautiful..."
                {...register("PostContent")}
              ></textarea>
              {errors.PostContent && (
                <p className="text-danger">{errors.PostContent.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Images" className="form-label">
                Choose Images (Up to 10)
              </label>
              <input
                className="form-control"
                type="file"
                id="Images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              {errors.Images && (
                <p className="text-danger">{errors.Images.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Video" className="form-label">
                Choose Video (Up to 10GB)
              </label>
              <input
                className="form-control"
                type="file"
                id="Video"
                accept="video/*"
                {...register("Video")}
              />
              {errors.Video && (
                <p className="text-danger">{errors.Video.message}</p>
              )}
            </div>

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateNewPost;
