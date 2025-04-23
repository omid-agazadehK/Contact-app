import style from "./Toast.module.css";

function Toast({ active, message }) {
  return (
    <div
      className={
        !active ? `${style.container}` : `${style.container} ${style.up}`
      }
    >
      <p>{message}</p>
    </div>
  );
}

export default Toast;
