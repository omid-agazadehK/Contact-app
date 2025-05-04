import { createContext, useEffect, useReducer } from "react";

import api from "../services/config";

const insitalState = {
  users: [],
  loading: true,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "DELETE":
      return {
        ...state,
        users: state.users.filter((user) => user.id != action.payload),
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "UPDATE":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        }),
      };
    default:
      return state;
  }
};

export const UsersContext = createContext();

function UsersProvider({ children }) {
  const [{ users, loading }, dispatch] = useReducer(reducer, insitalState);

  // delete
  const deleteUsers = async (usersId = []) => {
    if (usersId?.length === 0) return;
    try {
      await Promise.all(
        usersId.map((id) =>
          api.delete(`/users/${id}`).then(() => {
            dispatch({ type: "DELETE", payload: id });
          })
        )
      );
    } catch (error) {
      console.log("Error during delete:", error);
    }
  };
  //post
  const addUser = async (userData) => {
    if (!userData) return;
    try {
      const res = await api.post(`/users`, userData);
      dispatch({ type: "ADD_USER", payload: res });
    } catch (error) {
      console.log(error);
    }
  };
  // update
  const updateUser = async (update) => {
    if (Object.keys(update).length === 0) return;
    try {
      const res = await api.put(`users/${update.id}`, update);
      dispatch({ type: "UPDATE", payload: res });
    } catch (err) {
      console.log(err);
    }
  };

  //mount
  useEffect(() => {
    const fetchData = async () => {
      const id = setTimeout(async () => {
        try {
          const res = await api.get("/users");
          dispatch({ type: "SUCCESS", payload: res });
        } catch (error) {
          console.log(error);
        }
      }, 500);
      return () => clearTimeout(id);
    };
    fetchData();
  }, []);
  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        dispatch,
        addUser,
        updateUser,
        deleteUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
