import style from "./user.module.css";

function User({ user, checkHanler, selected, setNewId, setActive }) {
  const deleteHandler = () => {
    setNewId({ id: user.id, type: "delete" });
    setActive(true);
  };
  const editHandler = () => {
    setNewId({ id: user.id, type: "edit" });
    setActive(true);
  };

  return (
    <>
      <div className={style.container}>
        <input
          className={style.input}
          type="checkbox"
          checked={selected.includes(user.id)}
          onChange={() => checkHanler(user.id)}
        />
        <p className={style.name}>{user.name}</p>
        <div className={style.contact}>
          <p>{user.email}</p>
          <p>{user.phoneNumber}</p>
        </div>
        <p className={style.job}>{user.job}</p>
        <div className={style.controls}>
          <button
            onClick={() => editHandler()}
            className={style.create_btn}
            to={`user/${user.id}`}
          >
            Edit
          </button>
          <button className={style.delete_btn} onClick={() => deleteHandler()}>
            delete
          </button>
        </div>
      </div>
    </>
  );
}

export default User;
