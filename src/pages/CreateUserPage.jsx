import CreateContact from "../components/CreateContact";
import useTitle from "../hooks/useTitle";

import style from "./CreateUserPage.module.css";

function CreateUserPage() {
  useTitle("create user")
  return (
    <div className={style.container}>
      <CreateContact />
    </div>
  );
}

export default CreateUserPage;
