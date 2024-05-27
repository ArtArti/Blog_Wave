import { useState, useEffect } from "react";
import Post from "../post/Post";
import { getPostsBySellerId } from "../../Api/ApiService";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsBySellerId(currentPage, postsPerPage);
        setPosts(response.data);
        setTotalPages(Math.ceil(response.totalPosts / postsPerPage));
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

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4 flex flex-wrap">
        {Array.isArray(posts) &&
          posts.map((post) => <Post key={post._id} post={post} />)}
      </div>

      <div className="flex mt-4">
        <button
          className="btn mr-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mt-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn ml-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
