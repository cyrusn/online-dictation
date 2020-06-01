<template>
  <div class="field is-grouped">
    <div class="control is-expanded">
      <div class="field has-addons">
        <div class="control has-icons-left">
          <div class="select">
            <select v-model="selectedClazz" v-focus>
              <option value="">Class</option>
              <option v-for="(clazz, i) in clazzes" :key="i">{{
                clazz
              }}</option>
            </select>
          </div>
          <span class="icon is-left">
            <font-awesome-icon :icon="['fas', 'users']" />
          </span>
        </div>
        <p class="control has-icons-left">
          <span class="select">
            <select v-model="selected">
              <option value="">No.</option>
              <option
                v-for="(sts, i) in studentNames"
                :key="i"
                :value="sts.classNumber"
              >
                {{ sts.classNumber }}
              </option>
            </select>
          </span>
          <span class="icon is-left">
            <font-awesome-icon :icon="['fas', 'sort-numeric-down']" />
          </span>
        </p>
        <div class="control is-expanded has-icons-left">
          <div class="select is-fullwidth">
            <select v-model="selected">
              <option value="">
                Name
              </option>
              <option
                v-for="(sts, i) in studentNames"
                :key="i"
                :value="sts.classNumber"
              >
                {{ sts.name }}
              </option>
            </select>
          </div>
          <span class="icon is-left">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { join } from "path";

const clazzes = [
  "1A",
  "1B",
  "1C",
  "1D",
  "2A",
  "2B",
  "2C",
  "2D",
  "3A",
  "3B",
  "3C",
  "3D",
  "4A",
  "4B",
  "4C",
  "4D",
  "4E",
  "5A",
  "5B",
  "5C",
  "5D",
  "5E",
  "6A",
  "6B",
  "6C",
  "6D",
  "6E"
];

export default {
  data() {
    return { clazzes, studentNames: [] };
  },
  mounted() {
    const { student, getStudentList } = this;
    const { classCode } = student;
    if (classCode) {
      getStudentList(classCode);
    }
  },
  computed: {
    ...mapState(["student"]),
    selectedClazz: {
      get() {
        return this.student.classCode;
      },
      set(classCode) {
        const { updateStudentClassCode, getStudentList } = this;
        getStudentList(classCode).then(() => updateStudentClassCode(classCode));
      }
    },
    selected: {
      get() {
        return this.student.classNumber;
      },
      set(value) {
        if (!value) {
          const { classCode } = this.student;
          this.resetStudent();
          this.updateStudentClassCode(classCode);
          return;
        }
        const { studentNames } = this;
        const selectedStudent = studentNames.find(sts => {
          return sts.classNumber === value;
        });
        this.updateStudent(selectedStudent);
      }
    }
  },
  methods: {
    ...mapMutations([
      "updateStudent",
      "resetStudent",
      "updateStudentClassCode"
    ]),
    async getStudentList(clasCode) {
      await fetch(join("./data/studentList.json"))
        .then(response => response.json())
        .then(json => {
          this.studentNames = json.filter(sts => {
            return sts.classCode === clasCode;
          });
        });
    }
  }
};
</script>
