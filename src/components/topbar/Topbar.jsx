import { Link , NavLink} from "react-router-dom";
import "./topbar.css";
import axios from 'axios';

export default function Topbar() {
  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout');
      if (response.status === 200) {
        // Clear local storage or perform any client-side cleanup if needed
        localStorage.clear();
        // Redirect the user to the login page or perform any other desired action
        // For example, you can use window.location.href to redirect:
        window.location.href = '/';
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
          <Link to="#" onClick={handleLogout}>Logout</Link>


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
                   <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
                </NavLink>
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
