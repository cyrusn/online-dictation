<template>
  <p class="control">
    <input
      ref="AnswerInput"
      class="input"
      type="text"
      placeholder="Answer"
      v-focus
      v-model="answer"
      @change="onEnter"
      :disabled="diabled"
    />
  </p>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "lodash";

export default {
  data() {
    return { answer: "", diabled: false };
  },
  created() {
    this.$eventHub.$on("submit:answer", this.onSubmit);
    this.$eventHub.$on("open:modal", () => (this.diabled = true));
    this.$eventHub.$on("close:modal", () => (this.diabled = false));
  },
  destroyed() {
    this.$eventHub.$off("submit:answer");
    this.$eventHub.$off("open:modal");
    this.$eventHub.$off("close:modal");
  },
  computed: {
    ...mapState(["runningIndex", "vocab", "vocabIds", "responses", "mode"]),
    ...mapGetters(["incorrectRatio", "needReset", "hasNext"]),
    response() {
      const { vocab, answer } = this;
      const title = vocab.title;
      const score = vocab.title.toLowerCase() === answer.toLowerCase() ? 1 : 0;
      return { title, answer, score };
    }
  },
  methods: {
    ...mapMutations(["appendResponses"]),
    ...mapActions(["nextVocab"]),
    setDisable() {
      this.diabled = true;
    },
    onEnter: _.throttle(function() {
      this.$eventHub.$emit("submit:answer");
    }, 500),
    onSubmit() {
      const {
        appendResponses,
        response,
        $eventHub,
        hasNext,
        nextVocab,
        $router
      } = this;

      this.$refs.AnswerInput.focus();

      appendResponses(response);

      // this.needReset can only be retrieve at here but not in ln: 53
      // as `appendResponses` may vary its value.
      if (this.needReset) {
        $eventHub.$emit("open:modal");
        return;
      }

      if (hasNext) {
        nextVocab().then(() => (this.answer = ""));
        return;
      }

      $router.push("./report");
    }
  }
};
</script>
