<template>
  <p>
    <span class="icon">
      <font-awesome-icon :icon="['far', 'bookmark']" />
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
