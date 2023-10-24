import { useAuthContext } from "./useAuthContext";
import { useGroupsContext } from "./useGroupsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: groupsDispatch } = useGroupsContext();
  const logout = () => {
    // remove user form localStorage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    groupsDispatch({ type: "SET_GROUPS", payload: null });
  };

  return { logout };
};
