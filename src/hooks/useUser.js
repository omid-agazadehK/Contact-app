import { useContext } from "react";
import { UsersContext } from "../contexts/UsersContexts";

const useUser = () => {
  const users = useContext(UsersContext);
  return users;
};
export default useUser;
