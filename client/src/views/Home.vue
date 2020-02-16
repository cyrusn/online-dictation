<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half has-text-centered">
          <h1 class="title is-size-3">S.K.H. Li Ping Secondary School</h1>
          <hr />
          <h1 class="subtitle is-size-3">Online Vocabulary Tests</h1>
          <NameSelector />
          <QuizSelector />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NameSelector from "@/components/Form/NameSelector";
import QuizSelector from "@/components/Form/QuizSelector";

export default {
  components: { NameSelector, QuizSelector }
};
</script>
