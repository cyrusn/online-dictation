<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half has-text-centered">
          <p class="title is-2">S.K.H. Li Ping Secondary School</p>
          <p class="subtitle is-4">Online Vocabulary Tests</p>
          <NameSelector />
          <QuizSelector />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NameSelector from "@/components/Form/NameSelector";
import QuizSelector from "@/components/Form/QuizSelector";
import { mapMutations } from "vuex";

export default {
  mounted() {
    this.resetResponses();
    this.updateRunningIndex(0);
    this.resetVocab();
  },
  components: { NameSelector, QuizSelector },
  methods: {
    ...mapMutations(["updateRunningIndex", "resetResponses", "resetVocab"])
  }
};
</script>
