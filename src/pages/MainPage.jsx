import { useState } from "react";

import ContactList from "../components/ContactList";
import ContactHeader from "../components/ContactHeader";

import style from "./MainPage.module.css";
import useTitle from "../hooks/useTitle";
import useUser from "../hooks/useUser";

function MainPage() {
  useTitle("contact list");

  const { loading, users } = useUser();
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
