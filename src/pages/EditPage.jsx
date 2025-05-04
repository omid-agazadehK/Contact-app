import EditUser from "../components/EditUser";
import useTitle from "../hooks/useTitle";

import style from "./EditPage.module.css";

function EditPage() {
  useTitle("edit user")

  return (
    <>
      <div className={style.container}>
        <EditUser />
      </div>
    </>
  );
}

export default EditPage;
