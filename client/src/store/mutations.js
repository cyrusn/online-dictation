import Vue from "vue";
import _ from "lodash";
import constant from "./constant";

export default {
  updateStudentClassCode(state, classCode) {
    const selectedClassCodeStudent = Object.assign(
      {},
      constant.defaultStudent,
      { classCode }
    );
    Vue.set(state, "student", selectedClassCodeStudent);
  },
  updateStudent(state, student) {
    Vue.set(state, "student", student);
  },
  resetStudent(state) {
    Vue.set(state, "student", constant.defaultStudent);
  },
  updateQuizNames(state, quizNames) {
    Vue.set(state, "quizNames", quizNames);
  },
  updateSelectedQuiz(state, quizName) {
    state.selectedQuiz = quizName;
  },
  updateMode(state, mode) {
    state.mode = mode;
  },
  updateVocabIds(state, ids) {
    Vue.set(state, "vocabIds", ids);
  },
  updateVocab(state, vocab) {
    Vue.set(state, "vocab", vocab);
  },
  resetVocab(state) {
    Vue.set(state, "vocab", constant.defaultVocab);
  },
  appendResponses(state, response) {
    state.responses.push(response);
    // using _.sort.uniqBy to prevent multiple submission accidentally
    Vue.set(
      state,
      "responses",
      _(state.responses)
        .sort()
        .uniqBy("title")
        .value()
    );
  },
  resetResponses(state) {
    Vue.set(state, "responses", []);
  },
  updateRunningIndex(state, index) {
    state.runningIndex = index;
  }
};
