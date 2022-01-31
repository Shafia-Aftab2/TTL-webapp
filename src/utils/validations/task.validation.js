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

const createTranslationTopicSchema = yup.object({
  topic: yup.string().required("Topic is required."),
  title: yup.string().required("Title is required."),
  type: yup.string().default(taskTypes.TRANSLATION).required(),
  questionText: yup.string().optional(),
  textToTranslate: yup.string().required("Text to translate is required."),
  translatedText: yup.string().required("Translated Text is required."),
});

const createEmojiStoryTopicSchema = yup.object({
  topic: yup.string().required("Topic is required."),
  title: yup.string().required("Title is required."),
  type: yup.string().default(taskTypes.EMOJI_STORY).required(),
  questionText: yup.string().optional(),
  emojiStory: yup
    .array()
    .of(yup.string())
    .min(1, "At least one emoji is required.")
    .max(10, "More than ten emojis are not allowed.")
    .required("Emojis are required."),
});

export {
  createQandATopicSchema,
  updateQandATopicSchema,
  createCaptionThisTopicSchema,
  createTranslationTopicSchema,
  createEmojiStoryTopicSchema,
};
