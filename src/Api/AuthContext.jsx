// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the Auth state
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Assume we have a function to fetch the logged-in user
    const fetchLoggedInUser = async () => {
      const response = await fetch('http://localhost:8081/api/auth/user'); // Adjust the endpoint as needed
      const data = await response.json();
      setUser(data);
    };

    fetchLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (!auth) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return auth;
  };