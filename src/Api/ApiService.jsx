import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const createPost = async (post) => {
    try {
      const response = await api.post('/post/posts', post);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  export default {
    createPost,
  };