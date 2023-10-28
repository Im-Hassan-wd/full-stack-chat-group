import { useState, useEffect } from "react";
import { useGroupsContext } from "../../hooks/useGroupsContext";

import "./Home.css";

import Chat from "../../components/chat/Chat";
import Form from "../../components/form/Form";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const { groups, dispatch } = useGroupsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch(
        "https://full-stack-chat-group-backend.vercel.app/api/groups",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_GROUPS", payload: json });
      }
    };

    if (user) {
      fetchGroups();
    }
  }, [dispatch, groups, user]);

  return (
    <div className="home">
      <Sidebar
        isOpen={false}
        groups={groups}
        group={{}}
        setShowForm={setShowForm}
      />
      <Chat />
      {showForm && <Form setShowForm={setShowForm} />}
    </div>
  );
}
