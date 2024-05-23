import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singlePost.css";

export default function SinglePost() {
  const { id } = useParams(); // Using 'id' instead of '_id'
  const [post, setPost] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) { // Using 'id' instead of '_id'
        console.error("postId is undefined");
        setError("Post ID is undefined.");
        setLoading(false);
        return;
      }

      console.log(`Fetching post with ID: ${id}`);
      try {
        const response = await axios.put(`https://blog-server-nu-weld.vercel.app/api/post/posts/${id}`);
        console.log('Fetch response:', response);
        if (response.status === 200) {
          setPost(response.data);
          setEditedDescription(response.data.description || '');
          setEditedPrice(response.data.price || '');
        } else {
          setError(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching the post:", error);
        setError(error.response?.data?.message || "Error fetching the post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]); // 'id' instead of '_id'

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setEditedPrice(event.target.value);
  };

  const handleEditSubmit = async () => {
    if (!id) { // Using 'id' instead of '_id'
      console.error("postId is undefined");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8081/api/post/posts/${id}`, { // Using 'id' instead of '_id'
        description: editedDescription,
        price: editedPrice
      });
      console.log('Edit response:', response);
      if (response.status === 200) {
        alert('Post updated successfully');
        setPost((prevState) => ({
          ...prevState,
          description: editedDescription,
          price: editedPrice
        }));
      } else {
        alert(`Failed to update post: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating the post:', error);
      alert('Failed to update post');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
      </div>
    </div>
  );
}
