import { createContext, useEffect, useReducer, useState } from "react";

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
    case "SELECTE_DELETE":
      return {
        ...state,
        users: state.users.filter((user) => user.id != action.payload),
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
  const [deletedId, setDeletedId] = useState(null);
  const [deletedSelected, setDeleteSelected] = useState([]);
  const [update, setUpdate] = useState({});

  const [newCon, setnewCon] = useState("");
  const [{ users, loading }, dispatch] = useReducer(reducer, insitalState);
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
  //single delete
  useEffect(() => {
    if (!deletedId) return;
    const fetchData = async () => {
      try {
        const res = await api.delete(`/users/${deletedId}`);
        dispatch({ type: "DELETE", payload: res.id });
        setDeletedId(null);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [deletedId]);
  //select delete
  useEffect(() => {
    if (deletedSelected.length === 0) return;
    const fetchData = async () => {
      try {
        await Promise.all(
          deletedSelected.map((id) => api.delete(`/users/${id}`))
        );
        deletedSelected.forEach((id) => {
          dispatch({ type: "SELECTE_DELETE", payload: id });
        });
      } catch (error) {
        console.log(error);
      } finally {
        setDeleteSelected([]);
      }
    };
    fetchData();
  }, [deletedSelected]);
  //post
  useEffect(() => {
    if (!newCon) return;
    const fetchData = async () => {
      try {
        const res = await api.post(`/users`, newCon);
        dispatch({ type: "ADD_USER", payload: res });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [newCon]);
  // update
  useEffect(() => {
    if (Object.keys(update).length === 0) return;
    const fetchData = async () => {
      try {
        console.log(update);
        const res = await api.put(`users/${update.id}`, update);
        dispatch({ type: "UPDATE", payload: res });
        setUpdate({});
      } catch (err) {
        console.error("Error updating form:", err);
      }
    };
    fetchData();
  }, [update]);

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        dispatch,
        setDeletedId,
        setnewCon,
        setDeleteSelected,
        setUpdate,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
