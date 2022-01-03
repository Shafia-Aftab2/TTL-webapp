import * as yup from "yup";

const updateProfileSchema = yup.object({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Email must be valid.")
    .required("Email is required."),
  displayName: yup.string().required("Display Name is required."),
});

export { updateProfileSchema };
