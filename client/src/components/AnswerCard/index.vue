<template>
  <div class="card is-primary">
    <header class="card-header">
      <VocabTitle
        class="card-header-title is-size-3 is-centered is-info has-text-grey-dark"
      />
    </header>
    <div class="card-content">
      <div class="content">
        <AnswerInput />
      </div>
      <div class="content">
        <ProgressBar />
      </div>
    </div>
    <footer class="card-footer">
      <QuizName class="card-footer-item" />
      <SelectedMode class="card-footer-item" />
    </footer>
    <footer class="card-footer">
      <StudentName class="card-footer-item" />
    </footer>
    <footer class="card-footer">
      <AudioPlayer class="card-footer-item" />
      <NextButton class="card-footer-item" />
    </footer>
  </div>
</template>

<script>
import AudioPlayer from "@/components/AnswerCard/AudioPlayer";
import AnswerInput from "@/components/AnswerCard/AnswerInput";
import ProgressBar from "@/components/AnswerCard/ProgressBar";
import VocabTitle from "@/components/AnswerCard/VocabTitle";
import NextButton from "@/components/AnswerCard/NextButton";

import StudentName from "@/components/StudentName";
import SelectedMode from "@/components/SelectedMode";
import QuizName from "@/components/QuizName";

export default {
  components: {
    AnswerInput,
    AudioPlayer,
    StudentName,
    QuizName,
    SelectedMode,
    ProgressBar,
    VocabTitle,
    NextButton
  }
};
</script>
