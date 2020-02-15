<template>
  <div class="card is-primary" v-if="vocab._id">
    <header class="card-header">
      <p
        class="card-header-title is-size-3 is-centered is-info has-text-grey-dark"
      >
        {{ vocab.partOfSpeech + "." }} {{ vocab.definition }}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <AnswerInput :vocab="vocab" />
      </div>
      <div class="content"></div>
      <progress class="progress is-success" :value="index" :max="total">
        {{ Math.floor((index * 100) / total) }}%
      </progress>
    </div>
    <footer class="card-footer">
      <QuizName class="card-footer-item" />
    </footer>
    <footer class="card-footer">
      <StudentName class="card-footer-item" />
    </footer>
    <footer class="card-footer">
      <p class="card-footer-item">
        <AudioPlayer :_id="vocab._id" />
      </p>
      <p class="card-footer-item">
        <a @click="$eventHub.$emit('submit:answer')">
          <span class="icon">
            <i class="fas fa-share"></i>
          </span>
          {{ hasNext ? "Next" : "Submit" }}
        </a>
      </p>
    </footer>
  </div>
</template>

<script>
import AudioPlayer from "@/components/AnswerBox/AudioPlayer";
import AnswerInput from "@/components/AnswerBox/AnswerInput";
import StudentName from "@/components/StudentName";
import QuizName from "@/components/QuizName";
import { mapState } from "vuex";

export default {
  components: { AnswerInput, AudioPlayer, StudentName, QuizName },
  computed: {
    ...mapState([
      "vocab",
      "runningIndex",
      "student",
      "selectedQuiz",
      "vocabIds"
    ]),
    index() {
      return this.runningIndex + 1;
    },
    total() {
      return this.vocabIds.length;
    },
    hasNext() {
      return this.index < this.total;
    }
  },
  methods: {
    play() {
      this.audio.play();
    }
  }
};
// cannot update for the first vocab
</script>
