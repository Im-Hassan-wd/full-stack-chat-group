import { useState } from "react";
import { useGroupsContext } from "../../hooks/useGroupsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./Form.css";

export default function Form({ setShowForm }) {
  const { dispatch } = useGroupsContext();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    setIsPending(true);

    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const members = {
      user_id: user._id,
      displayName: user.displayName,
    };

    const group = { name, description, members };

    const response = await fetch(
      "https://full-stack-chat-group-backend.vercel.app/api/groups",
      {
        method: "POST",
        body: JSON.stringify(group),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      setIsPending(false);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      console.log("new group added", json);
      dispatch({ type: "CREATE_GROUP", payload: json });
      setIsPending(false);
      setShowForm(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <form className="group-form" onSubmit={handleSubmit}>
          <div className="form-title">
            <h4>New Channel</h4>
            <button className="close">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <input
            type="text"
            placeholder="Channel name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes("name") ? "error" : ""}
          />
          <textarea
            placeholder="Channel description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes("description") ? "error" : ""}
          ></textarea>
          {isPending ? (
            <button className="submit">Saving...</button>
          ) : (
            <button className="submit">Save</button>
          )}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
