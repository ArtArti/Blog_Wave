import ApiService from "../../Api/ApiService";
import "./write.css";
import { useState } from "react";

export default function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const post = { title, description, price };
      const response = await ApiService.createPost(post);
      console.log("Post created:", response.data);
      alert("success");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl mx-5">
        <figure>
          <img
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="Album"
            className="p-2"
          />
        </figure>
        <div className="card-body w-[60%]">
          <h2 className="card-title justify-center text-center">New Post!</h2>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                className="writeInput"
                placeholder="Title"
                type="text"
                autoFocus={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea className="textarea textarea-bordered" 
               value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              placeholder="description"></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Enter starting price"
                className="input input-bordered"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
