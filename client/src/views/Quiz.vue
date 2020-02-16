<template>
  <div class="section">
    <Modal></Modal>
    <div class="container">
      <div class="columns is-centered">
        <AnswerCard class="column is-half" />
      </div>
    </div>
  </div>
</template>

<script>
import AnswerCard from "@/components/AnswerCard";
import Modal from "@/components/Modal";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    AnswerCard,
    Modal
  },
  mounted() {
    if (!this.selectedQuiz) {
      this.$router.push("/");
      return;
    }

    if (!this.vocab.title) {
      this.updateVocab();
    }
  },
  computed: {
    ...mapState(["selectedQuiz", "vocab"])
  },
  methods: {
    ...mapActions(["updateVocab"])
  }
};
</script>
