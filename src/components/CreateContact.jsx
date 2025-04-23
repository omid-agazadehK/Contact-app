import { useContext, useState } from "react";
import { UsersContext } from "../contexts/UsersContexts";
import { submitHanler, validate } from "../utility/script";

import style from "./CreateContact.module.css";
import Modal from "./modal";
import Toast from "./Toast";
import Form from "./Form";

function CreateContact() {
  const { setnewCon } = useContext(UsersContext);
  const [inputsData, setInputsData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    job: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    job: "",
  });
  const [active, setActive] = useState(false);
  const [toast, setToast] = useState(false);
  const idGenrator = String(Math.floor(Math.random() * 378 * 79842));

  const inputHandler = (e) => {
    const { name, value } = e.target;
    const currData = { ...inputsData, [name]: value };
    setInputsData(currData);

    const newErrors = validate(currData, setErrors);
    setErrors((prevError) => ({ ...prevError, [name]: newErrors[name] }));
  };

  const finalSubmit = () => {
    setnewCon({
      id: idGenrator,
      name: inputsData.firstName + " " + inputsData.lastName,
      email: inputsData.email,
      job: inputsData.job,
      phoneNumber: inputsData.phoneNumber,
    });
    setActive(false);
    setInputsData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      job: "",
    });
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  return (
    <>
      {active && (
        <Modal
          setActive={() => setActive(false)}
          message="Before we continue, are you sure you want to add this user?"
          onclick={() => finalSubmit()}
        />
      )}
      <Toast active={toast} message={"(._.) New user added successfully."} />
      <div className={style.background}>
        <Form
          onSub={(e) => submitHanler(e, setActive, setErrors, inputsData)}
          inputsData={inputsData}
          inputHandler={inputHandler}
          errors={errors}
          pageMessage={"Create user"}
          buttonText={"Create contact"}
        />
      </div>
    </>
  );
}

export default CreateContact;
