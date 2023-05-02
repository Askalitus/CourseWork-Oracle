<template>
  <div>
    <div class="filter">
      <FilterPanel
        @sortAll="sortAll($event)"
        @sortNew="sortNew()"
        @sortOld="sortOld()"
        @sortProccess="sortProccess($event)"
        @sortAllow="sortAllow($event)"
        @sortReady="sortReady($event)"
        :darkMode="darkMode"
        :lightMode="lightMode"
      />
    </div>
    <div class="button_panel">
      <p :class="{darkFilter_text: darkMode, lightFilter_text: lightMode}">{{ filterText }}</p>
      <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="role == 'user'" @click="createTaskPopup">
        Создать задачу
      </button>
      <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="role == 'admin'" @click="adminPanel">Админ панель</button>
    </div>
    <div class="task_list">
      <div class="task" v-for="task in taskList" :key="task.id">
        <Task
          :task="task"
          :role="role"
          @updateTaskPopup="updateTaskPopup($event)"
          @workerPopup="workerPopup($event)"
          @adminPopup="adminPopup($event)"
          :darkMode="darkMode"
          :lightMode="lightMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FilterPanel from "../components/FilterPanel.vue";
import Task from "../components/Task.vue";
import axios from "axios";
export default {
  components: { FilterPanel, Task },
  props: { 
    tasks: Array,
    darkMode: Boolean,
    lightMode: Boolean },
  data() {
    return {
      role: "",
      filterText: "Все задачи",
      status: 0,
      action: "",
      task: {},
    };
  },

  mounted() {
    axios
      .post(
        "http://localhost:3000/user/role",
        { "Access-Control-Allow-Origin": "http://localhost:3000" },
        { withCredentials: true }
      )
      .then((res) => {
        this.role = res.data;
      });
  },
  computed: {
    taskList() {
      if (this.status != 0) {
        return this.tasks.filter((task) => task.status == this.status);
      }
      return this.tasks;
    },
  },
  methods: {
    sortNew() {
      this.filterText = "Новые";
      return this.tasks.sort((a, b) => {
        return new Date(b.startDate) - new Date(a.startDate);
      });
    },
    sortOld() {
      this.filterText = "Старые";
      return this.tasks.sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      });
    },
    sortAll(event) {
      this.filterText = "Все задачи";
      this.status = event;
    },
    sortProccess(event) {
      this.filterText = "В обработке";
      this.status = event;
    },
    sortAllow(event) {
      this.filterText = "Принятые";
      this.status = event;
    },
    sortReady(event) {
      this.filterText = "Готовые";
      this.status = event;
    },

    createTaskPopup() {
      this.$emit("createTaskPopup", {
        task: {},
        action: "userCreate",
        popup: true,
      });
    },
    updateTaskPopup(e) {
      this.$emit("updateTaskPopup", {
        task: e,
        action: "userUpdate",
        popup: true,
      });
    },
    workerPopup(e) {
      this.$emit("workerPopup", {
        task: e,
        popup: true,
      });
    },
    adminPopup(e) {
      this.$emit("adminPopup", {
        task: e,
        popup: true,
      });
    },
    closePopup(e) {
      this.$emit("closePopup", {
        action: "",
        popup: false,
      });
    },
    adminPanel(){
      this.$emit('adminPanel')
    }
  },
};
</script>

<style scoped>
/* dark mode start */
.darkButton {
  padding: 1.38888889vh 1.82291667vw;
  background: #212121;
  box-shadow: inset 0px 6px 10px rgba(63, 63, 63, 0.5),
    inset 0px -3px 10px rgba(0, 0, 0, 0.5);
  border-radius: 0.78125vw;
  border: none;
  color: white;
  font-size: 0.8333333333333vw;
  cursor: pointer;
}

.darkButton:hover {
  color: rgba(20, 255, 236, 1);
}

.darkButton:active {
  box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5),
    inset 0px -5px 12px rgba(0, 0, 0, 0.5);
}

.darkFilter_text {
  font-size: 2.08333333vw;
  color: white;
}
/* dark mode end */

/* light mode start */
.lightButton {
  padding: 1.38888889vh 1.82291667vw;
  background: #0DCEDA;
  box-shadow: inset 0px 6px 10px #69F6FF, inset 0px -3px 10px #119DA6;
  border-radius: 0.78125vw;
  border: none;
  color: white;
  font-size: 0.8333333333333vw;
  font-weight: 700;
  cursor: pointer;
}

.lightButton:hover {
  color: black;
}

.lightButton:active {
  box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5),
    inset 0px -5px 12px rgba(0, 0, 0, 0.5);
}

.lightFilter_text {
  font-size: 2.08333333vw;
  color: black;
}
/* light mode end */
.button_panel {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 2.77777778vh;
  margin-bottom: 1.85185185vh;
}

.task_list {
  display: flex;
  flex-direction: column;
  gap: 1.85185185vh;
}
</style>
