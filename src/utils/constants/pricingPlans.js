const planNames = {
  FREE_TRIAL: "FREE TRIAL",
  EXAM_READY: "EXAM-READY",
  BUDDING_SPEAKERS: "BUDDING SPEAKERS",
  LONG_HAUL: "FOR THE LONG-HAUL",
};

const planData = [
  {
    name: "FREE TRIAL",
    prices: [
      { period: "month", price: "£0", showPeriod: true },
      { period: "year", price: "£0", showPeriod: true },
    ],
    features: [
      "✔ Full access to talkie features: Q&A and quizzes",
      "✔ Individual teacher, 4 classes",
      "✔ Storage for a month",
    ],
    description:
      "One month free - no credit card required! Starts automatically when you signup.",
    cta: {
      text: "Start your free trial",
    },
    theme: "primary",
  },
  {
    name: "EXAM-READY",
    prices: [
      { period: "month", price: "£10", showPeriod: true },
      { period: "year", price: "£108", showPeriod: true },
    ],
    features: [
      "✔ Full access to talkie features: Q&A and quizzes",
      "✔ Individual teacher, 8 classes",
      "✔ Storage for a month",
    ],
    description:
      "Have your students speaking regularly on the run up to exams or during summer. Here when you need us!",
    cta: {
      text: "Get Started",
    },
    theme: "light",
  },
  {
    name: "BUDDING SPEAKERS",
    prices: [
      { period: "month", price: "£20", showPeriod: true },
      { period: "year", price: "£216", showPeriod: true },
    ],
    features: [
      "✔ Full access to talkie features: Q&A and quizzes",
      "✔ Individual teacher, 8 classes",
      "✔ Storage for 6 month",
      "✔ Download feature (Coming Soon)",
      "✔ Technical support",
    ],
    description:
      "Keep track of your students’ progress and access their early recordings.",
    cta: {
      text: "Get Started",
    },
    theme: "primary",
  },
  {
    name: "FOR THE LONG-HAUL",
    prices: [
      { period: "month", price: "Ask for a quote", showPeriod: false },
      { period: "year", price: "Ask for a quote", showPeriod: false },
    ],
    features: [
      "✔ Full access to talkie features: Q&A and quizzes",
      "✔ Multiple teachers and classes",
      "✔ Storage for 12 months or longer!",
      "✔ Download feature (Coming Soon)",
      "✔ Technical support",
    ],
    description:
      "Encourage the habit of speaking. Keep track of your students’ progress and listen to them speak from Day One.",
    cta: {
      text: "Contact us",
    },
    theme: "secondary",
  },
];

export default Object.freeze({
  planNames,
  planData,
});
