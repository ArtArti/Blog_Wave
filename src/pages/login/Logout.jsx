import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleLogout() {
      try {
        await axios.post(
          "https://blog-server-nu-weld.vercel.app/api/auth/logout",
          {},
          { withCredentials: true }
        );
        navigate("/"); // Redirect to login page
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    handleLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
