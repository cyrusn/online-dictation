export default {
  hasNext(state) {
    return state.runningIndex < state.vocabIds.length - 1;
  },
  incorrectRatio(state) {
    const { responses, vocabIds } = state;
    const incorrectResponses = responses.filter(res => res.score === 0);
    return incorrectResponses.length / vocabIds.length || 0;
  },
  correctRatio(state) {
    const { responses, vocabIds } = state;
    const correctResponses = responses.filter(res => res.score === 1);
    return correctResponses.length / vocabIds.length || 0;
  },
  needReset(state, getters) {
    const { mode } = state;
    const { incorrectRatio } = getters;
    switch (mode) {
      case 0:
        return false;
      case 1:
        return incorrectRatio > 0.5;
      case 2:
        return incorrectRatio > 0.25;
      default:
        return false;
    }
  }
};
