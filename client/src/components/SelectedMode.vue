<template>
  <p>
    <span class="icon">
      <font-awesome-icon :icon="['far', 'file-alt']" />
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
