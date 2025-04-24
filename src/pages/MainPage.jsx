import { useContext, useState } from "react";
import { UsersContext } from "../contexts/UsersContexts";

import ContactList from "../components/ContactList";
import ContactHeader from "../components/ContactHeader";

import style from "./MainPage.module.css";

function MainPage() {
  const { loading, users } = useContext(UsersContext);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className={style.back}>
        <div className={style.container}>
          <ContactHeader
            selected={selected}
            setSelected={setSelected}
            search={search}
            setSearch={setSearch}
          />
          {loading && <div className={style.spinner}></div>}

          <ContactList
            selected={selected}
            setSelected={setSelected}
            userData={filteredUsers}
          />
        </div>
      </div>
    </>
  );
}

export default MainPage;
