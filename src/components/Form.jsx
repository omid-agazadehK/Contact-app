import { Link } from "react-router";
import style from "./Form.module.css";

function Form({ onSubmit, errors, register, type = "create" }) {
  const pageHead = type === "create" ? "Create user" : "Edit user";
  const pageButton = type === "create" ? "Create contact" : "Apply edit";
  return (
    <form className={style.container} onSubmit={onSubmit}>
      <Link className={style.return} to="/">
        Return
      </Link>
      <h1 className={style.page_name}>{pageHead}</h1>

      <div className={style.full_name}>
        <div className={style.name}>
          <label htmlFor="firstName">First name</label>
          <input
            {...register("firstName")}
            name="firstName"
            id="firstName"
            autoFocus
            type="text"
            placeholder="First name"
          />

          {errors.firstName && (
            <p className={style.error}>{errors.firstName?.message}</p>
          )}
        </div>
        <div className={style.last_name}>
          <label htmlFor="lastName">Last name</label>
          <input
            {...register("lastName")}
            name="lastName"
            id="lastName"
            type="text"
            placeholder="Last name"
          />
          {errors.lastName && (
            <p className={style.error}>{errors.lastName?.message}</p>
          )}
        </div>
      </div>
      <div className={style.email}>
        <label htmlFor="email">Email name</label>
        <input
          {...register("email")}
          name="email"
          id="email"
          type="text"
          placeholder="example@gmail.com"
        />
        {errors.email && <p className={style.error}>{errors.email?.message}</p>}
      </div>
      <div className={style.job}>
        <label htmlFor="job">Job</label>
        <input
          {...register("job")}
          name="job"
          id="job"
          type="text"
          placeholder="Job"
        />
        {errors.job && <p className={style.error}>{errors.job?.message}</p>}
      </div>
      <div className={style.phone_number}>
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          {...register("phoneNumber")}
          name="phoneNumber"
          id="phoneNumber"
          type="text"
          placeholder="Phone number"
        />
        {errors.phoneNumber && (
          <p className={style.error}>{errors.phoneNumber?.message}</p>
        )}
      </div>

      <button className={style.create_button} type="submit">
        {pageButton}
      </button>
    </form>
  );
}

export default Form;
