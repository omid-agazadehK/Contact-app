import { Link } from "react-router";

import style from "./Form.module.css";

function Form({ onSub, inputsData, inputHandler, errors, buttonText,pageMessage }) {
  return (
    <form className={style.container} onSubmit={onSub}>
      <Link className={style.return} to="/">
        Return
      </Link>
      <h1 className={style.page_name}>{pageMessage}</h1>

      <div className={style.full_name}>
        <div className={style.name}>
          <label htmlFor="firstName">First name</label>
          <input
            value={inputsData.firstName}
            name="firstName"
            id="firstName"
            onChange={inputHandler}
            autoFocus
            type="text"
            placeholder="First name"
          />
          {errors.firstName && (
            <p className={style.error}>{errors.firstName}</p>
          )}
        </div>
        <div className={style.last_name}>
          <label htmlFor="lastName">Last name</label>
          <input
            value={inputsData.lastName}
            name="lastName"
            id="lastName"
            onChange={inputHandler}
            type="text"
            placeholder="Last name"
          />
          {errors.lastName && <p className={style.error}>{errors.lastName}</p>}
        </div>
      </div>
      <div className={style.email}>
        <label htmlFor="email">Email name</label>
        <input
          value={inputsData.email}
          name="email"
          id="email"
          onChange={inputHandler}
          type="email"
          placeholder="example@gmail.com"
        />
        {errors.email && <p className={style.error}>{errors.email}</p>}
      </div>
      <div className={style.job}>
        <label htmlFor="job">Job</label>
        <input
          value={inputsData.job}
          name="job"
          id="job"
          onChange={inputHandler}
          type="text"
          placeholder="Job"
        />
        {errors.job && <p className={style.error}>{errors.job}</p>}
      </div>
      <div className={style.phone_number}>
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          value={inputsData.phoneNumber}
          name="phoneNumber"
          id="phoneNumber"
          onChange={inputHandler}
          type="text"
          placeholder="Phone number"
        />
        {errors.phoneNumber && (
          <p className={style.error}>{errors.phoneNumber}</p>
        )}
      </div>

      <button className={style.create_button} type="submit">
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
