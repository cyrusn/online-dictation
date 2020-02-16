import _ from "lodash";

export default {
  updateSelectedQuiz({ commit }, quizName) {
    commit("updateSelectedQuiz", quizName);
    commit("resetVocab");
  },
  async updateQuizNames({ commit }) {
    return await fetch(`./api/quiz`)
      .then(res => res.json())
      .then(json => {
        commit("updateQuizNames", json.sort());
      });
  },
  async updateVocabIds({ commit, state }) {
    const { selectedQuiz } = state;
    if (!selectedQuiz) {
      return;
    }
    return await fetch(`./api/quiz/${selectedQuiz}`)
      .then(res => res.json())
      .then(json => {
        const vocabIds = _.shuffle(json);
        commit("updateVocabIds", vocabIds);
        return vocabIds;
      });
  },
  shuffleVocabIds({ commit, state }) {
    commit("updateVocabIds", _.shuffle(state.vocabIds));
  },

  updateRunningIndex({ commit }, index) {
    commit("updateRunningIndex", index);
    return index;
  },
  nextVocab({ dispatch, state }) {
    return dispatch("updateRunningIndex", state.runningIndex + 1).then(index =>
      dispatch("updateVocab", index)
    );
  },
  async updateVocab({ commit, state }) {
    const vocabId = state.vocabIds[state.runningIndex];
    if (!vocabId) {
      return;
    }
    return await fetch(`./api/vocab/${vocabId}`)
      .then(res => res.json())
      .then(json => {
        commit("updateVocab", json);
      });
  },
  resetQuiz({ dispatch, commit }) {
    return dispatch("updateRunningIndex", 0)
      .then(() => commit("resetResponses"))
      .then(() => dispatch("updateVocab"))
      .then(() => dispatch("shuffleVocabIds"));
  }
};
