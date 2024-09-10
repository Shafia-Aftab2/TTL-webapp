const planNames = {
  FREE_TRIAL: "FREE TRIAL",
  STANDARED_PLAN: "Standared Plan",
  EXAM_READY: "Exam Ready",
  SCHOOL_PLAN: "School Plan",
  ACADEMY_PLAN: "Academy Plan",
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
    // name: "Standared Plan",
    name: "Exam Ready",
    prices: [
      { period: "month", price: "£149.99", showPeriod: true },
      { period: "year", price: "£1649.99", showPeriod: true },
    ],
    features: [
      "✔ Quizzes",
      "✔ Emoji Stories",
      "✔ Photocard",
      "✔ Q&A with Teacher",
      "✔ Audio Feedback with Teacher",
      "✔ Student Management",
      "✔ Feedback saved for 6 months",
      "✔ AI Feedback for 1,000 Quizzes per day",
      "✔ 1 class, with 1 teacher and 40 students",
      "✔ Students leaderboard",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    description:
      // "Have your students speaking regularly on the run up to exams or during summer. Here when you need us!",
      "Suitbale for a Class",
    cta: {
      text: "Get Started",
    },
    theme: "light",
  },
  {
    name: "School Plan",
    prices: [
      { period: "month", price: "Contact Us", showPeriod: false },
      { period: "year", price: "Contact Us", showPeriod: false },
    ],
    features: [
      "✔ Quizzes",
      "✔ Emoji Stories",
      "✔ Photocard",
      "✔ Q&A with Teacher",
      "✔ Audio Feedback with Teacher",
      "✔ Student Management",
      "✔ Teachers and Class Management",
      "✔ Feedback saved for 1 year",
      "✔ Unlimited AI Feedback",
      "✔ 10 teachers and 400 students",
      "✔ Custom features and unlimited technical support",
      "✔ Students leaderboard",
      " ",
      " ",
    ],
    description:
      // "Keep track of your students’ progress and access their early recordings.",
      "Suitable for a School/College",
    cta: {
      text: "Get Started",
    },
    theme: "primary",
  },
  {
    name: "Academy Plan",
    prices: [
      { period: "month", price: "Contact Us", showPeriod: false },
      { period: "year", price: "Contact Us", showPeriod: false },
    ],
    features: [
      "✔ Quizzes",
      "✔ Emoji Stories",
      "✔ Photocard",
      "✔ Q&A with Teacher",
      "✔ Audio Feedback with Teacher",
      "✔ Student Management",
      "✔ Teachers and Class Management",
      "✔ School Management",
      "✔ Feedback saved for 1 year",
      "✔ Unlimited AI Feedback",
      "✔ Unlimited teachers and students",
      "✔ Custom features and unlimited technical support",
      "✔ Students Leaderboard",
    ],
    description:
      // "Encourage the habit of speaking. Keep track of your students’ progress and listen to them speak from Day One.",
      "suitable for a group of schools.",
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
