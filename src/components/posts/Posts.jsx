import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/post/posts");
        setPosts(response.data.data); // Access the 'data' property to get the array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  console.log("Posts:", posts);

  return (
    <div className="posts">
      {Array.isArray(posts) && posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
