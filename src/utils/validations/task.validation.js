import * as yup from "yup";
import taskTypes from "../constants/taskTypes";

const createQandATopicSchema = yup.object({
  topic: yup.string().required("Topic is required."),
  title: yup.string().required("Title is required."),
  type: yup.string().default(taskTypes.QUESTION_ANSWER).required(),
  questionText: yup.string().optional(),
  voiceForQnA: yup.string().required("Audio is required."),
});

const updateQandATopicSchema = yup.object({
  topic: yup.string().required("Topic is required."),
  title: yup.string().required("Title is required."),
  type: yup.string().default(taskTypes.QUESTION_ANSWER).required(),
  questionText: yup.string().optional(),
});

const createCaptionThisTopicSchema = yup.object({
  topic: yup.string().required("Topic is required."),
  title: yup.string().required("Title is required."),
  type: yup.string().default(taskTypes.CAPTION_THIS).required(),
  questionText: yup.string().optional(),
  captionImage: yup.mixed().required("Caption image is required."),
});

export {
  createQandATopicSchema,
  updateQandATopicSchema,
  createCaptionThisTopicSchema,
};
