import * as yup from "yup";

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

export { teacherSignupSchema };
