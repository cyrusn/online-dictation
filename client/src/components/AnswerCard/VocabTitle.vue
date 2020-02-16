<template>
  <p>{{ vocab.partOfSpeech + "." }} {{ vocab.definition }}</p>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["vocab"])
  }
};
</script>
