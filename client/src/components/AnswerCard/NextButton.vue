<template>
  <a @click="onClick">
    <span class="icon">
      <font-awesome-icon :icon="['fas', 'share']" />
    </span>
    {{ hasNext ? "Next" : "Submit" }}
  </a>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  computed: {
    ...mapGetters(["hasNext"])
  },
  methods: {
    onClick: _.throttle(function() {
      this.$eventHub.$emit("submit:answer");
    }, 500)
  }
};
</script>
