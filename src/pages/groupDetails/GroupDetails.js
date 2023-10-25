import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGroupsContext } from "../../hooks/useGroupsContext";

import "./GroupDetails.css";

// components
import Sidebar from "../../components/sidebar/Sidebar";
import Chat from "../../components/chat/Chat";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function GroupDetails() {
  const { id } = useParams();
  const { group, dispatch } = useGroupsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await fetch("/api/groups/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_GROUP", payload: json });
      }
    };

    if (user) {
      fetchGroup();
    }
  }, [id, group, user]);
  return (
    <div className="group-details">
      <Sidebar isOpen={true} group={group} groups={[]} setShowForm={""} />
      <Chat group={group} />
    </div>
  );
}
