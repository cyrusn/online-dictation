<template>
  <progress class="progress is-success" :value="runningIndex + 1" :max="total">
    {{ Math.floor(((runningIndex + 1) * 100) / total) }}%
  </progress>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["vocabIds", "runningIndex"]),
    total() {
      return this.vocabIds.length;
    }
  }
};
</script>
