import "./Chat.css";
import Photo from "../../assets/weird.png";
import Photo2 from "../../assets/warwick.jpeg";
import { format, parseISO } from "date-fns";
import { formatDate } from "../../utils/formatDate";

// components
import Input from "../input/Input";
import DateGroup from "../data-group/DateGroup";
import Avatar from "../avatar/Avatar";

export default function Chat({ group, active, setActive }) {
  const { getDate } = formatDate();

  return (
    <div className="chat">
      <header>
        <button className="burger" onClick={() => setActive(true)}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="chat-name">{group?.name}</div>
      </header>
      <ul className="messages">
        {group?.chats.map((chat) => (
          <li className="message" key={chat._id}>
            <Avatar src={Photo} />
            <div className="content">
              <div className="username">{chat.displayName}</div>
              <small className="time">
                {getDate(parseISO(chat.created_at))} at{" "}
                {format(parseISO(chat.created_at), "hh:mm a")}
              </small>
              <p>{chat.text}</p>
            </div>
          </li>
        ))}
        <DateGroup />
      </ul>
      <Input group={group} />
    </div>
  );
}
