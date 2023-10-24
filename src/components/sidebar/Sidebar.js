import { Link } from "react-router-dom";
import "./Sidebar.css";

import Photo from "../../assets/weird.png";

// components
import Searchbar from "../searchbar/Searchbar";
import User from "../user/User";
import Avatar from "../avatar/Avatar";

export default function Sidebar({ isOpen, groups, setShowForm, group }) {
  const getFirstLetters = (name) => {
    const words = name.split(" ");
    return words.map((word) => word.charAt(0)).join("");
  };

  return (
    <aside className="sidebar">
      {isOpen ? (
        <header>
          <Link to="/">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </Link>
          <div className="">All channels</div>
        </header>
      ) : (
        <header>
          <div className="">Channels</div>
          <button className="add-group" onClick={() => setShowForm(true)}>
            +
          </button>
        </header>
      )}

      {!isOpen ? (
        <div className="channel-list">
          <Searchbar />
          <ul className="channels">
            {groups &&
              groups?.map((group) => (
                <Link to={`/${group._id}`} className="channel" key={group._id}>
                  <div className="channel-cover">
                    {getFirstLetters(group.name)}
                  </div>
                  <div className="channel-name">{group.name}</div>
                </Link>
              ))}
          </ul>
        </div>
      ) : (
        <div className="channel-info">
          <div className="channel-name">{group?.name}</div>
          <p className="channel-description">{group?.description}</p>
          <ul className="channel-members">
            <h4>Members</h4>
            <li>
              <Avatar src={Photo} />
              <span>Nellie Francis</span>
            </li>
            <li>
              <Avatar src={Photo} />
              <span>Shaunna Firth</span>
            </li>
            <li>
              <Avatar src={Photo} />
              <span>Annaliese Huynh</span>
            </li>
          </ul>
        </div>
      )}
      <User />
    </aside>
  );
}
