import React, { useContext, useState } from "react";
import { Link } from "react-router";
import style from "./ContactHeader.module.css";
import { UsersContext } from "../contexts/UsersContexts";
import Modal from "./modal";

function ContactHeader({ search, setSearch, selected, setSelected }) {
  const { setDeleteSelected } = useContext(UsersContext);
  const [active, setActive] = useState(false);
  const deleteHandler = () => {
    if (selected.length === 0) return;
    setDeleteSelected(selected);
    setSelected([]);
    setActive(false);
  };
  return (
    <>
      {active && (
        <Modal
          setActive={() => setActive(false)}
          message="hola"
          onclick={() => deleteHandler()}
        />
      )}
      <div className={style.contanier}>
        <div className={style.search}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="5"
            height="5"
          >
            <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
          </svg>
          <input
            type="text"
            placeholder="Search Contact"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          />
        </div>
        <div className={style.buttons}>
          <Link className={style.create_btn} to="/create-user">
            Create new contact
          </Link>

          <button
            className={
              selected.length === 0
                ? `${style.disable_delete_btn}`
                : style.delete_btn
            }
            disabled={selected.length === 0 ? true : false}
            onClick={() => setActive(true)}
          >
            Delete selected
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactHeader;
