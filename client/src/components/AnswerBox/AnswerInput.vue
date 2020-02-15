<template>
  <p class="control">
    <input
      class="input"
      type="text"
      placeholder="Answer"
      v-focus
      v-model="answer"
      @keypress.enter="() => $eventHub.$emit('submit:answer')"
      :disabled="diabled"
    />
  </p>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: ["vocab"],
  data() {
    return { answer: "", diabled: false };
  },
  mounted() {
    this.$eventHub.$on("submit:answer", this.onSubmit);
    this.$eventHub.$on("reset", () => {
      this.diabled = !this.diabled;
    });
  },
  computed: {
    ...mapState(["runningIndex", "vocabIds", "responses", "mode"]),
    needReset() {
      const { mode, responses, vocabIds } = this;
      const incorrectResponses = responses.filter(res => res.score === 0);
      const incorrectRatio = incorrectResponses.length / vocabIds.length;
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
    },
    response() {
      const { vocab, answer } = this;
      const title = vocab.title;
      const score = vocab.title.toLowerCase() === answer.toLowerCase() ? 1 : 0;
      return { title, answer, score };
    },
    hasNext() {
      const { runningIndex, vocabIds } = this;
      return runningIndex < vocabIds.length - 1;
    }
  },
  methods: {
    ...mapMutations(["appendResponses"]),
    ...mapActions(["nextVocab"]),
    setDisable() {
      this.diabled = true;
    },
    onSubmit() {
      const {
        $router,
        appendResponses,
        response,
        $eventHub,
        needReset,
        hasNext,
        nextVocab
      } = this;

      appendResponses(response);

      if (needReset) {
        $eventHub.$emit("modal:open");
        // reset will be run when the modal is closed
        return;
      }

      if (hasNext) {
        nextVocab().then(() => (this.answer = ""));
        return;
      }

      $router.push("/report");
    }
  }
};
</script>
