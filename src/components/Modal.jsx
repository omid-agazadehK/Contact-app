import style from "./Modal.module.css";

function Modal({ message = "are u sure u wanna do this", onclick, setActive }) {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <p>{message}</p>
        <div>
          <button className={style.create_btn} onClick={onclick}>
            Accept
          </button>
          <button className={style.cancel_btn} onClick={setActive}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
