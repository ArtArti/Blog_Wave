import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./post.css";

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);

  const handleLike = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/api/post/posts/${post._id}/like`);
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return (
    <div className="post">
      <img
        className="postImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
        </div>
        <span className="postTitle">
          <Link to={`/seller/post/${post._id}`} className="link">
            Price: ${post.price}
          </Link>
        </span>
        <hr />
        {/* <span className="postDate">1 hour ago</span> */}
      </div>
      <h1 className="postDesc">
        {post.description}
      </h1>
      <div className="postActions">
        <button onClick={handleLike}>Like</button>
        <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
      </div>
    </div>
  );
}
