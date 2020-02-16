<template>
  <a @click="play">
    <span class="icon">
      <i class="fas fa-play"></i>
    </span>
    Play
  </a>
</template>

<script>
import { mapState } from "vuex";
export default {
  mounted() {
    this.audio.load();
  },
  watch: {
    vocab() {
      this.audio.load();
    }
  },
  computed: {
    ...mapState(["vocab"]),
    audio() {
      const { _id } = this.vocab;
      const src = `./api/voice/${_id}`;
      const audio = new Audio(src);
      audio.autoplay = true;
      return audio;
    }
  },
  methods: {
    play() {
      this.audio.play();
    }
  }
};
</script>
