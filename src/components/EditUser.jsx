import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/config";

import style from "./EditUser.module.css";
import { UsersContext } from "../contexts/UsersContexts";
import { submitHanler, validate } from "../utility/script";
import Modal from "../components/modal";
import Form from "../components/Form";
function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    job: "",
  });
  const { setUpdate } = useContext(UsersContext);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    job: "",
  });
  const [active, setActive] = useState(false);

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const currData = { ...userData, [name]: value };
    setUserData(currData);

    const newErrors = validate(currData, setErrors);
    setErrors((prevError) => ({ ...prevError, [name]: newErrors[name] }));
  };
  const finalSubmit = () => {
    setUpdate({
      id,
      name: userData.firstName + " " + userData.lastName,
      email: userData.email,
      job: userData.job,
      phoneNumber: userData.phoneNumber,
    });
    setActive(false);
    navigate("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        const fname = res.name.split(" ")[0];
        const lname = res.name.split(" ")[1];
        const finalRes = {
          id: res.id,
          firstName: fname,
          lastName: lname,
          email: res.email,
          phoneNumber: res.phoneNumber,
          job: res.job,
        };
        setUserData(finalRes);
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
          onSub={(e) => submitHanler(e, setActive, setErrors, userData)}
          inputsData={userData}
          inputHandler={inputHandler}
          errors={errors}
          pageMessage={"Edit user"}
          buttonText={"Apply edits"}
        />
      </div>
    </>
  );
}

export default EditUser;
