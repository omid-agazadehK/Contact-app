import { useContext, useState } from "react";
import style from "./ContactList.module.css";
import Modal from "./modal";
import Toast from "./Toast";
import { UsersContext } from "../contexts/UsersContexts";
import { useNavigate } from "react-router";
import ContactListHeader from "./ContactListHeader";
import User from "./User";

function ContactList({ userData, selected, setSelected }) {
  const Navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [newId, setNewId] = useState("");
  const [toast, setToast] = useState(false);
  const { setDeletedId } = useContext(UsersContext);

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
      setDeletedId(newId.id);
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
