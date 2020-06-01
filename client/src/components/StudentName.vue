<template>
  <p>
    <span class="icon">
      <font-awesome-icon :icon="['far', 'id-badge']" />
    </span>
    {{ name }}
  </p>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["student"]),
    name() {
      const { student } = this;
      const { classCode, classNumber, name } = student;
      return `${classCode}` + `${classNumber}`.padStart(2, 0) + ` ${name}`;
    }
  }
};
</script>
