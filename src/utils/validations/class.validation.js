import * as yup from "yup";

const createClassSchema = yup.object({
  name: yup.string().required("Name is required."),
  language: yup.string().required("Langugage is required."),
  schoolId: yup.string().required("School is required."),
});

export { createClassSchema };
