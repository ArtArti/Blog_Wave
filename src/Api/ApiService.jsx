import axios from 'axios';

const BASE_URL = 'https://blog-server-nu-weld.vercel.app/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('jwtToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Login function
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/signin', { email, password });
    return response.data; // Ensure it returns the complete response data
  } catch (error) {
    throw error.response.data;
  }
};

// Register function
export const register = async (name, email, password) => {
  try {
    const response = await apiClient.post('/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get post by ID
export const getPostsBySellerId = async (page, postsPerPage) => {
  try {
    const response = await apiClient.get(`post/posts?page=${page}&limit=${postsPerPage}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update post by ID
export const updatePostById = async (title,id, description, price) => {
  try {
    const response = await apiClient.put(`/post/posts/${id}`, { title, description, price });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new post
export const createPost = async (post) => {
  try {
    const response = await apiClient.post('/post/posts', post);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete post by ID
export const deletePostById = async (id) => {
  try {
    const response = await apiClient.delete(`/post/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    await apiClient.post('/auth/logout'); // Adjust the endpoint as necessary
    // Clear the token cookie
    Cookies.remove('token'); // Assuming 'token' is the name of your cookie
    // Redirect to the login page or home page
    window.location.href = '/'; // Adjust the redirect URL as needed
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

 export default apiClient;