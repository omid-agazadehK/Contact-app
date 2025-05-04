import {  useState } from "react";
import { useNavigate } from "react-router";

import ContactListHeader from "./ContactListHeader";
import Toast from "./Toast";
import User from "./User";
import Modal from "./modal";

import style from "./ContactList.module.css";
import useUser from "../hooks/useUser";

function ContactList({ userData, selected, setSelected }) {
  const Navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [newId, setNewId] = useState("");
  const [toast, setToast] = useState(false);
  const { deleteUsers, loading } = useUser();

  const checkHanler = (id) => {
    setSelected((prevData) =>
      prevData.includes(id)
        ? selected.filter((a) => a !== id)
        : [...prevData, id]
    );
  };
  const allHandler = (e) => {
    const allCheck = userData.map((user) => user.id);
    setSelected(e.target.checked ? allCheck : []);
  };
  const subHanler = () => {
    if (newId.type === "delete") {
      deleteUsers([newId.id]);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } else {
      Navigate(`/user/${newId.id}`);
    }
    setActive(false);
  };
  return (
    <>
      {active && (
        <Modal
          message={
            newId.type === "delete"
              ? "are u sure u wanna delete this user ?"
              : "are u sure u wanna edit this user ?"
          }
          onclick={() => subHanler()}
          setActive={() => setActive(false)}
        />
      )}
      <Toast active={toast} message={"(._.) user deleted successfully."} />
      <div className={style.container}>
        <ContactListHeader
          allHandler={allHandler}
          userData={userData}
          selected={selected}
        />
        {userData.length === 0 && !loading && (
          <p className={style.empty_text}>
            Your contact list is empty. Add new contacts to get started!
          </p>
        )}
        <div className={style.scroll}>
          {userData &&
            userData.map((user) => (
              <User
                selected={selected}
                user={user}
                checkHanler={checkHanler}
                setNewId={setNewId}
                setActive={setActive}
                key={user.id}
                toast={toast}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default ContactList;
