<template>
  <div class="modal" :class="{ 'is-active': isActive }" v-if="isActive">
    <div class="modal-background"></div>
    <div class="modal-content">
      <article class="message is-info">
        <div class="message-header">
          <p>Practice makes perfect</p>
          <button
            class="delete"
            aria-label="delete"
            @click="closeModal"
          ></button>
        </div>
        <div class="message-body">
          <p>Excuse me, you’ve made too many mistakes.</p>
          <p>It’s time to practise again!</p>
          <hr />
          <button
            class="button is-fullwidth is-info is-outlined"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return { isActive: false };
  },
  mounted() {
    const { $eventHub, openModal } = this;
    $eventHub.$on("open:modal", openModal);
  },
  destroyed() {
    this.$eventHub.$off("open:modal");
  },
  methods: {
    ...mapActions(["resetQuiz"]),
    openModal() {
      this.isActive = true;
    },
    closeModal() {
      this.isActive = false;
      this.resetQuiz();
      this.$eventHub.$emit("close:modal");
    }
  }
};
</script>
