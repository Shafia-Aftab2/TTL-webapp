import * as yup from "yup";

const loginSchema = yup.object({
  emailOrUsername: yup.string().required("Email/Username is required."),
  password: yup.string().required("Password is required."),
});

const studentSignupSchema = yup.object({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

const privatestudentSignupSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
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

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Email must be valid.")
    .required("Email is required."),
});

const resetPasswordSchema = yup.object({
  password: yup.string().required("Password is required."),
  confirmPassword: yup
    .string()
    .test("passwords-match", "Passwords must match.", function (value) {
      return this.parent.password === value;
    }),
});

export {
  loginSchema,
  studentSignupSchema,
  teacherSignupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  privatestudentSignupSchema,
};
