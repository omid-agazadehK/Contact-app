import {  useState } from "react";

import style from "./CreateContact.module.css";

import Modal from "./modal";
import Toast from "./Toast";
import Form from "./Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userSchema from "../schema/form";
import useUser from "../hooks/useUser";

function CreateContact() {
  const { addUser } = useUser();
  const [active, setActive] = useState(false);
  const [toast, setToast] = useState(false);
  const [data, setData] = useState([]);
  const idGenrator = String(Math.floor(Math.random() * 378 * 79842));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const { firstName, lastName, email, job, phoneNumber } = data;

  const finalSubmit = () => {
    const userData = {
      id: idGenrator,
      name: firstName + " " + lastName,
      email,
      job,
      phoneNumber,
    };

    addUser(userData);
    setActive(false);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
    setData([]);
    reset();
  };

  const submitHandlers = (data) => {
    setData(data);
    setActive(true);
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
          onSubmit={handleSubmit(submitHandlers)}
          errors={errors}
          register={register}
          type="create"
        />
      </div>
    </>
  );
}

export default CreateContact;
