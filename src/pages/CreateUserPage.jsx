import CreateContact from "../components/CreateContact";

import style from "./CreateUserPage.module.css";

function CreateUserPage() {
  return (
    <div className={style.container}>
      <CreateContact />
    </div>
  );
}

export default CreateUserPage;
