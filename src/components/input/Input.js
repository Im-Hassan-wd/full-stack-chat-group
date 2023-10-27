import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGroupsContext } from "../../hooks/useGroupsContext";

import "./Input.css";

export default function Input({ group }) {
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();
  const { dispatch } = useGroupsContext();
  let now = new Date();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const messageToAdd = {
      _id: now.getTime(),
      text: message,
      displayName: user.displayName,
      created_at: now,
    };

    const chat = {
      chats: [...group.chats, messageToAdd],
    };

    const response = await fetch("api/groups/" + group._id, {
      method: "PATCH",
      body: JSON.stringify(chat),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "GET_GROUP", payload: json });
      setMessage("");
    }
  };

  return (
    <form className="input-div" onSubmit={handleSendMessage}>
      <input
        type="text"
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button>
        <span className="material-symbols-outlined">send</span>
      </button>
    </form>
  );
}
