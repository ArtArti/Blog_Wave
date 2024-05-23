import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `https://blog-server-nu-weld.vercel.app/api/post/posts/${post._id}/like`
      );
      setLikes(response.data.likes);
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return (
    <>
      <div className="card w-64 bg-base-100 shadow-xl mx-3 my-1">
        <figure>
          <img
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            <Link to={`/seller/post/${post._id}`} className="link">
              Title:{post.title}
            </Link>
            <div className="badge badge-secondary">${post.price}</div>
          </h2>
          <p>{post.description}</p>
          <div className="card-actions justify-end">
            <button className="btn" onClick={handleLike}>
              <FaHeart
                style={{
                  color: liked ? "red" : "grey",
                  fontSize: "24px",
                  marginRight: "8px",
                }}
              />
              {likes}
            </button>
            <button className="btn btn-accent">Intrested</button>
          </div>
        </div>
      </div>
    </>
  );
}
