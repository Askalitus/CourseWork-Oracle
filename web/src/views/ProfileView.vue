<template>
  <div class="container">
    <div class="viniet" v-if="popup">
      <Popup :action="action" @closePopup="closePopup($event)" :task="task" :darkMode="darkMode" :lightMode="lightMode" />
    </div>
    <div class="wrapper">
      <div class="profile_card">
        <ProfileCard :darkMode="darkMode" :lightMode="lightMode" />
      </div>
      <div class="right_side">
        <RouterView
          @createTaskPopup="createTaskPopup($event)"
          @updateTaskPopup="updateTaskPopup($event)"
          @workerPopup="workerPopup($event)"
          @adminPopup="adminPopup($event)"
          @closePopup="closePopup($event)"
          @adminPanel="adminPanel"
          @toTask="toTask"
          :tasks="tasks"
          :darkMode="darkMode"
          :lightMode="lightMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from "../components/ProfileCard.vue";
import FilterPanel from "../components/FilterPanel.vue";
import Task from "../components/Task.vue";
import Popup from "../components/Popup.vue";
import axios from "axios";
export default {
  props: {darkMode: Boolean, lightMode: Boolean},
  components: { ProfileCard, FilterPanel, Task, Popup },
  data() {
    return {
      role: "",
      tasks: [],
      filterText: "Все задачи",
      status: 0,
      popup: false,
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
    axios
      .post(
        "http://localhost:3000/tasks/all",
        { "Access-Control-Allow-Origin": "http://localhost:3000" },
        { withCredentials: true }
      )
      .then((res) => (this.tasks = res.data));
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
      return this.tasks.sort((a, b) => {
        return new Date(b.startDate) - new Date(a.startDate);
      });
    },
    sortOld() {
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

    createTaskPopup(e) {
      this.task = e.task;
      this.action = e.action;
      this.popup = e.popup;
    },
    updateTaskPopup(e) {
      this.task = e.task;
      this.action = e.action;
      this.popup = e.popup;
    },
    workerPopup(e) {
      this.task = e.task;
      this.popup = e.popup;
    },
    adminPopup(e) {
      this.task = e.task;
      this.popup = e.popup;
    },
    closePopup(e) {
      if (e) {
        this.action = e.action;
        this.popup = e.popup;
      }

      axios
        .post(
          "http://localhost:3000/tasks/all",
          { "Access-Control-Allow-Origin": "http://localhost:3000" },
          { withCredentials: true }
        )
        .then((res) => (this.tasks = res.data));
    },
    adminPanel(){
      this.$router.push("/admin")
    },
    toTask(){
      this.$router.push("/profile")
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  margin-top: 75px;
  justify-content: center;
  min-height: 82.5vh;
}
.viniet {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper {
  display: flex;
  align-items: start;
}
.right_side {
  width: 34.8958333vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
.profile_card {
  margin-right: 6.77083333vw;
}
</style>
