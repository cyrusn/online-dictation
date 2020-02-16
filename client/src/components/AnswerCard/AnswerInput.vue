<template>
  <div>
    {{ answer }}
    <p class="control">
      <input
        ref="AnswerInput"
        class="input"
        type="text"
        placeholder="Answer"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        v-focus
        v-model="answer"
        @keypress.enter="onEnter"
        :disabled="diabled"
        :class="{ 'is-danger': warning }"
      />
    </p>

    <p class="help is-danger" v-if="warning">
      Answer cannot be empty.
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import _ from "lodash";

export default {
  data() {
    return { answer: "", diabled: false, warning: false };
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
      const score =
        title.toLowerCase().trim() === answer.toLowerCase().trim() ? 1 : 0;
      return {
        title,
        answer: answer.trim(),
        score
      };
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
      if (!this.answer) {
        this.warning = true;
        return;
      }
      this.warning = false;
      const {
        appendResponses,
        response,
        $eventHub,
        hasNext,
        nextVocab,
        $router
      } = this;

      appendResponses(response);

      this.$refs.AnswerInput.focus();
      // clear input field for mobile device
      this.$refs.AnswerInput.value = 0;
      this.answer = "";

      // this.needReset can only be retrieve at here but not in ln: 53
      // as `appendResponses` may vary its value.
      if (this.needReset) {
        $eventHub.$emit("open:modal");
        return;
      }

      if (hasNext) {
        nextVocab();
        return;
      }

      $router.push("./report");
    }
  }
};
</script>
