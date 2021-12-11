import * as yup from "yup";

const studentSignupSchema = yup.object({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

const teacherSignupSchema = yup.object({
  name: yup.string().required("Name is required."),
  displayName: yup.string().required("Display Name is required."),
  schoolName: yup.string().required("School Name is required."),
  email: yup
    .string()
    .required("Email is required.")
    .email("Email must be valid."),
  password: yup.string().required("Password is required."),
});

export { studentSignupSchema, teacherSignupSchema };
