<template>
  <div class="field has-addons">
    <p class="control has-icons-left">
      <span class="select">
        <select v-model="localMode">
          <option value="">Mode</option>
          <option v-for="(m, i) in modeText" :key="i" :value="i">{{
            m
          }}</option>
        </select>
      </span>
      <span class="icon is-left">
        <font-awesome-icon :icon="['far', 'file-alt']" />
      </span>
    </p>
    <div class="control is-expanded has-icons-left">
      <div class="select is-fullwidth">
        <select v-model="localSelectedQuiz" @keyup.enter="onStart">
          <option value="">Quiz</option>
          <option v-for="(quiz, i) in quizNames" :key="i" :value="quiz">{{
            quiz
          }}</option>
        </select>
      </div>
      <span class="icon is-left">
        <font-awesome-icon :icon="['far', 'bookmark']" />
      </span>
    </div>
    <div class="control">
      <button
        type="submit"
        class="button is-info"
        @click="onStart"
        :disabled="!validate"
      >
        start
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const modeText = ["Normal", "At least 50% correct", "At least 75% correct"];
export default {
  mounted() {
    this.updateQuizNames();
  },
  data() {
    return {
      modeText
    };
  },
  watch: {},
  computed: {
    ...mapState(["quizNames", "selectedQuiz", "mode", "vocab", "student"]),
    validate() {
      const { selectedQuiz, student } = this;
      return selectedQuiz && student.name;
    },
    localMode: {
      get() {
        return this.mode;
      },
      set(val) {
        this.updateMode(val);
      }
    },
    localSelectedQuiz: {
      get() {
        return this.selectedQuiz;
      },
      set(quizName) {
        this.updateSelectedQuiz(quizName);
      }
    }
  },
  methods: {
    ...mapMutations(["updateMode", "runningIndex"]),
    ...mapActions([
      "updateQuizNames",
      "updateVocabIds",
      "updateSelectedQuiz",
      "updateVocab"
    ]),
    onStart() {
      const {
        updateVocabIds,
        $router,
        validate,
        updateVocab,
        runningIndex
      } = this;
      if (validate) {
        updateVocabIds()
          .then(() => {
            return updateVocab(runningIndex);
          })
          .then(() => {
            $router.push("/quiz");
          });
      }
    }
  }
};
</script>
