<template>
  <a @click="play">
    <span class="icon">
      <font-awesome-icon :icon="['fas', 'play']" />
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
      if (!_id) {
        return new Audio();
      }
      const src = `./data/audio/${_id}.mp3`;
      const audio = new Audio(src);
      audio.autoplay = true;
      return audio;
    }
  },
  methods: {
    play() {
      this.audio.load();
    }
  }
};
</script>
