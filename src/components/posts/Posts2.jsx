import { useState, useEffect } from 'react';
import axios from 'axios';

const Posts2= ({ sellerId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchSellerPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/post/posts/${sellerId}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching seller posts:', error);
      }
    };

    fetchSellerPosts();
  }, [sellerId]);

  return (
    <div>
      <h2>Your Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts2;
