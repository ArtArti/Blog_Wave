 import { useEffect , useState} from "react";
import {NavLink} from "react-router-dom";
import "./topbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Topbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logoutLoading, setLogoutloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Make the API call to fetch user details
        const response = await axios.get('https://blog-server-nu-weld.vercel.app/api/auth/user', {
          withCredentials: true // Ensure cookies are sent with the request
          
        });
        setUser(response.data.data); // Set user data
      } catch (err) {
        setError(err.response ? err.response.data.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  //                   

//  logout handler


const handleLogout = () => {
  navigate("/logout");
};

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
          <NavLink
                  to="/seller"
                  className={({ isActive }) =>
                    `mx-2 block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  HOME
                </NavLink>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
         <NavLink
                  to="/seller/write"
                  className={({ isActive }) =>
                    `mx-2 block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  WRITE
                </NavLink>
          </li>
          <li className="topListItem">
         {/* <button
                  to="#"
                 
                  className={({ isActive }) =>
                    `mx-2 block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  LogOut
                </button> */}
                <button
            type="button"
            onClick={handleLogout}
            className="items-center flex gap-4 right-10 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
              LogOut
             
            </button>
          </li>
         


        </ul>
      </div>
      <div className="topRight">
       
      
          <NavLink
                  to="/seller/settings"
                  className={({ isActive }) =>
                    `mx-2 block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                     {user ? (
        <>
          <p>{user.email}</p>
        </>
      ) : (
        <p>No user data</p>
      )}
                </NavLink>
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
