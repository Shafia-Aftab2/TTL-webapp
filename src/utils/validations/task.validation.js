import * as yup from "yup";
import taskTypes from "../constants/taskTypes";

const createQandATopicSchema = yup.object({
  topic: yup.string().required("Topic is required."),
  title: yup.string().required("Title is required."),
  type: yup.string().default(taskTypes.QUESTION_ANSWER).required(),
  questionText: yup.string().optional(),
  voiceForQnA: yup.string().required("Audio is required."),
});

export { createQandATopicSchema };
