<template>
  <a @click="play"
    ><span class="icon">
      <i class="fas fa-play"></i>
    </span>
    Play</a
  >
</template>

<script>
export default {
  props: ["_id"],
  mounted() {
    this.audio.load();
  },
  watch: {
    _id() {
      this.audio.load();
    }
  },
  computed: {
    audio() {
      const { _id } = this;
      const src = `/api/voice/${_id}`;
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
