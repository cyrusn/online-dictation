<template>
  <p>
    <span class="icon">
      <i class="fas fa-book"></i>
    </span>
    {{ selectedQuiz }}
  </p>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["selectedQuiz"])
  }
};
</script>
