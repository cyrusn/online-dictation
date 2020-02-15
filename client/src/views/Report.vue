<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <nav class="card">
            <header class="card-header">
              <p class="card-header-title is-size-3 is-centered">
                Report
              </p>
            </header>
            <footer class="card-footer">
              <StudentName class="card-footer-item" />
            </footer>
            <footer class="card-footer">
              <QuizName class="card-footer-item" />
            </footer>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span class="icon">
                  <i class="fas fa-check-circle" aria-hidden="true"></i>
                </span>
                {{ Math.floor(correctRatio * 100) }}%
              </p>
            </footer>
            <footer class="card-footer">
              <div class="card-footer-item">
                <span class="icon">
                  <i class="fas fa-clock" aria-hidden="true"></i>
                </span>
                <time :datetime="today.toString()">
                  {{ today.toDateString() }}
                  {{ `${today.getHours()}`.padStart(2, 0) }}:{{
                    today.getMinutes()
                  }}
                </time>
              </div>
            </footer>
            <footer class="card-footer">
              <a class="card-footer-item" @click="toggleShow">
                Show incorrect responses
              </a>
            </footer>
            <div v-if="isShow">
              <footer
                class="card-footer"
                v-for="(res, i) in responses.filter(res => res.score == 0)"
                :key="i"
              >
                <div class="card-footer-item">
                  <p class="has-text-danger">
                    <span class="icon">
                      <i class="fas fa-times" aria-hidden="true"></i>
                    </span>
                    {{ res.answer }}
                  </p>
                </div>
                <div class="card-footer-item">
                  <p class="has-text-">
                    <span class="icon">
                      <i class="fas fa-check-circle" aria-hidden="true"></i>
                    </span>
                    {{ res.title }}
                  </p>
                </div>
              </footer>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StudentName from "@/components/StudentName";
import QuizName from "@/components/QuizName";

export default {
  components: { StudentName, QuizName },
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    ...mapState(["responses"]),
    correctRatio() {
      const { responses } = this;
      const correctResponse = responses.filter(res => res.score === 1);
      return correctResponse.length / responses.length || 0;
    },
    today() {
      return new Date();
    }
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
