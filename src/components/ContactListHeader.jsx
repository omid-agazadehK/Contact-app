import style from "./ContactListHeader.module.css";

function ContactListHeader({ allHandler, userData, selected }) {
  return (
    <div className={style.header}>
      <input
        className={style.input}
        type="checkbox"
        onChange={(e) => allHandler(e)}
        checked={userData.length === selected.length && selected.length > 0}
      />
      <p className={style.name}>NAME</p>
      <p className={style.contact}>CONTACT</p>
      <p className={style.job}>JOB</p>
      <p className={style.controls}>CONTROLS</p>
    </div>
  );
}

export default ContactListHeader;
