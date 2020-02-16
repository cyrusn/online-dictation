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
import { mapState } from "vuex";

export default {
  mounted() {
    if (!this.selectedQuiz) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState(["selectedQuiz"])
  },
  components: {
    AnswerCard,
    Modal
  }
};
</script>
