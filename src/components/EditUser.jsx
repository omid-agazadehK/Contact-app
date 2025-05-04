import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import Modal from "../components/modal";
import Form from "../components/Form";

import api from "../services/config";
import style from "./EditUser.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import userSchema from "../schema/form";
import useUser from "../hooks/useUser";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({});
  const { firstName, lastName, email, job, phoneNumber } = formData;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    values: formData,
  });

  const submitHandlers = (data) => {
    setActive(true);
    setFormData(data);
  };
  const finalSubmit = () => {
    updateUser({
      id,
      name: firstName + " " + lastName,
      email,
      job,
      phoneNumber,
    });
    setActive(false);
    navigate("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        const fullName = res.name.split(" ");
        const finalRes = {
          id: res.id,
          firstName: fullName[0],
          lastName: fullName[1],
          email: res.email,
          phoneNumber: res.phoneNumber,
          job: res.job,
        };
        setFormData(finalRes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {active && (
        <Modal
          setActive={() => setActive(false)}
          message="are u sure u  wanna update this contact ?"
          onclick={() => finalSubmit()}
          navigate={"/"}
        />
      )}
      <div className={style.background}>
        <Form
          onSubmit={handleSubmit(submitHandlers)}
          errors={errors}
          register={register}
          type="edit"
        />
      </div>
    </>
  );
}

export default EditUser;
