import * as yup from "yup";

const contactUsSchema = yup.object({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Email must be valid.")
    .required("Email is required."),
  subject: yup.string().required("Subject is required."),
  message: yup.string().required("Message is required."),
});

const concatValidations = (val1, val2) => val1.concat(val2);

export { contactUsSchema, concatValidations };
