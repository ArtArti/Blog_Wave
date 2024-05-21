import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singlePost.css";

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null); // Changed to null for proper initial state check
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        console.error("postId is undefined");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8081/api/post/posts/${postId}`);
        setPost(response.data);
        setEditedDescription(response.data.description || '');
        setEditedPrice(response.data.price || '');
      } catch (error) {
        console.error("Error fetching the post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setEditedPrice(event.target.value);
  };

  const handleEditSubmit = async () => {
    if (!postId) {
      console.error("postId is undefined");
      return;
    }

    try {
      await axios.put(`http://localhost:8081/api/post/posts/${postId}`, {
        description: editedDescription,
        price: editedPrice
      });
      alert('Post updated successfully');
      setPost((prevState) => ({
        ...prevState,
        description: editedDescription,
        price: editedPrice
      }));
    } catch (error) {
      console.error('Error updating the post:', error);
      alert('Failed to update post');
    }
  };

  if (!post) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={post.img || "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
          alt=""
        />
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <button onClick={handleEditSubmit}>Save Changes</button>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor text-black">
              <Link className="link" to={`/seller/posts?username=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <label className="text-black">Description</label>
        <input
          type="text"
          className="text-black"
          value={editedDescription}
          onChange={handleDescriptionChange}
        />
        <label className="text-black">Price</label>
        <input
          type="text"
          value={editedPrice}
          onChange={handlePriceChange}
        />
        <p className="singlePostDesc text-black">
          {post.description}
        </p>
      </div>
    </div>
  );
}
