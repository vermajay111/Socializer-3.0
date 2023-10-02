import "bootstrap/dist/css/bootstrap.css";

function CreateNewPost() {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter a title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Post Content
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Enter Something Beautiful..."
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          Choose Images (Up to 10)
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          multiple
          accept="image/*"
          onChange="checkFileCount(this)"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          Choose Video
        </label>
        <input className="form-control" type="file" id="formFile" />
      </div>
    </>
  );
}

export default CreateNewPost;
