import * as yup from "yup";

const updateTeacherProfileSchema = yup.object({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Email must be valid.")
    .required("Email is required."),
  displayName: yup.string().required("Display Name is required."),
});

const updateStudentProfileSchema = yup.object({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
  username: yup.string().required("Username is required."),
});

export { updateTeacherProfileSchema, updateStudentProfileSchema };
