<template>
  <p>
    <span class="icon">
      <i class="fas fa-file-alt"></i>
    </span>
    {{ modeText }}
  </p>
</template>

<script>
import { mapState } from "vuex";

const modeText = ["Normal", "At least 50% correct", "At least 75% correct"];

export default {
  computed: {
    ...mapState(["mode"]),
    modeText() {
      return modeText[this.mode];
    }
  }
};
</script>
