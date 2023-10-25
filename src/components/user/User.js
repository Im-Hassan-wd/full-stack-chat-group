import Avatar from "../avatar/Avatar";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./User.css";
import Photo from "../../assets/warwick.jpeg";

import { useState } from "react";

export default function User() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  // const {dispatch}

  const handleClick = (e) => {
    logout();
  };

  return (
    <div className="user">
      <div className="main">
        <Avatar src={Photo} />
        <div className="username">{user?.displayName}</div>
        <button
          onClick={() => setShowSnackbar(!showSnackbar)}
          className="material-symbols-outlined"
        >
          expand_more
        </button>
      </div>
      {showSnackbar && (
        <ul className="more">
          <li>
            <span className="material-symbols-outlined">account_circle</span>
            <span>My profile</span>
          </li>
          <li>
            <span className="material-symbols-outlined">package_2</span>
            <span>Tweeter</span>
          </li>
          <li className="logout" onClick={handleClick}>
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </li>
        </ul>
      )}
    </div>
  );
}
