<template>
  <div class="section">
    <Modal></Modal>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <AnswerBox />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AnswerBox from "@/components/AnswerBox";
import Modal from "@/components/Modal";
export default {
  components: {
    AnswerBox,
    Modal
  },
  mounted() {
    const { selectedQuiz, $router, updateVocab, runningIndex } = this;
    if (!selectedQuiz) {
      $router.push("/");
    }
    updateVocab(runningIndex);
  },
  computed: {
    ...mapState([
      "student",
      "selectedQuiz",
      "vocabIds",
      "vocab",
      "runningIndex",
      "responses"
    ])
  },
  methods: {
    ...mapActions(["updateVocab"])
  }
};
</script>
