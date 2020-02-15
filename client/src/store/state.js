import constant from "./constant.js";

export default {
  student: constant.defaultStudent,
  // quizzes stores all quizzes' name
  quizNames: [],
  // vocab id in database for further lookup
  vocabIds: [],
  mode: 0,
  selectedQuiz: "",
  runningIndex: 0,
  vocab: constant.defaultVocab,
  // store each response answered by student with following key
  // response title is also the correct answer, which is same as vocab.title
  // answer is what user's answer
  // { title: "", answer: "", score: 0 }
  responses: []
};
