import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 10;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://blog-server-nu-weld.vercel.app/api/post/posts?page=${currentPage}&limit=${postsPerPage}`);
        setPosts(response.data.data); // Access the 'data' property to get the array of posts
        setTotalPages(Math.ceil(response.data.totalPosts / postsPerPage));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  console.log("Posts:", posts);

  return (
    <div className="posts">
      {Array.isArray(posts) && posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
