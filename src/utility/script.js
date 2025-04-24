export const submitHanler = (e, setActive,setErrors,inputsData) => {
  e.preventDefault();
  const newErrors = validate(inputsData);
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;
  setActive(true);
};
export const validate = (inputsData) => {
  const { firstName, lastName, email, phoneNumber, job } = inputsData;
  const newErrors = {};
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^(\+98|0)?9\d{9}$/;

  if (firstName.length < 3 || firstName.length > 8) {
    newErrors.firstName = "Character must be between 3 and 8";
  }
  if (lastName.length < 3 || lastName.length > 8) {
    newErrors.lastName = "Character must be between 3 and 8";
  }
  if (job.length < 3 || job.length > 10) {
    newErrors.job = "Character must be between 3 and 10";
  }
  if (!email || !emailRegex.test(email)) {
    newErrors.email = "Please enter a valid email address";
  }
  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    newErrors.phoneNumber = "Please enter a valid phone number";
  }

  return newErrors;
};
