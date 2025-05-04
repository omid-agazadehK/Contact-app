import { object, string } from "yup";

let userSchema = object({
  firstName: string()
    .min(3, "Must be at least 3 characters")
    .max(10, "Must be at most 10 characters")
    .required("First name is required"),
  lastName: string()
    .min(3, "Must be at least 3 characters")
    .max(10, "Must be at most 10 characters")
    .required("List name is required"),
  job: string()
    .min(3, "Must be at least 3 characters")
    .max(10, "Must be at most 10 characters")
    .required("Job field is required"),
  email: string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  phoneNumber: string()
    .matches(/^(\+98|0)?9[0-9]{9}$/, "Phone number is not valid")
    .required("Phone number is required"),
});
export default userSchema;

