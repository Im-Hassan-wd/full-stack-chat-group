import { createContext, useEffect, useReducer } from "react";

export const GroupsContext = createContext();

export const groupsReducer = (state, action) => {
  switch (action.type) {
    case "SET_GROUPS":
      return { groups: action.payload };
    case "CREATE_GROUP":
      return { groups: [action.payload, ...state.groups] };
    case "GET_GROUP":
      return { group: action.payload };
    default:
      return state;
  }
};

export const GroupsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(groupsReducer, {
    groups: null,
  });

  return (
    <GroupsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GroupsContext.Provider>
  );
};
