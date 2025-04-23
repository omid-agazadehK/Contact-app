import React from "react";
import style from "./CreateUserPage.module.css";
import CreateContact from "../components/CreateContact";
function CreateUserPage() {
  return (
    <div className={style.container}>
      <CreateContact />
    </div>
  );
}

export default CreateUserPage;
