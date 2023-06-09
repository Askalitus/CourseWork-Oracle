<template>
  <div :class="{darkContainerPopup: darkMode, lightContainerPopup: lightMode}">
    <div class="user" v-if="role == 'user'">
      <div class="inputs">
        <input
          :class="{darkInput: darkMode, lightInput: lightMode}"
          type="text"
          placeholder="Описание проблемы (Что случилось)"
          v-model="problem"
        />
        <input :class="{darkInput: darkMode, lightInput: lightMode}" type="text" placeholder="Кабинет" v-model="cabinet" />
        <div class="error" v-if="error">
          <p>{{ error }}</p>
        </div>
      </div>
      <div class="buttons">
        <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="action == 'userCreate'" @click="createTask">
          Создать
        </button>
        <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="action == 'userUpdate'" @click="updateTask">
          Изменить
        </button>
        <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="action == 'userUpdate'" @click="deleteTask">
          Удалить
        </button>
        <button :class="{darkButton: darkMode, lightButton: lightMode}" @click="closePopup">Закрыть</button>
      </div>
    </div>

    <div class="worker" v-if="role == 'worker'">
      <div class="inputs">
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Описание</p>
          <div :class="{darkDesc: darkMode, lightDesc: lightMode}">
            <p>{{ task.problem }}</p>
          </div>
        </div>
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Кабинет</p>
          <div :class="{darkDesc: darkMode, lightDesc: lightMode}">
            <p>{{ task.cabinet }}</p>
          </div>
        </div>
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Заявитель</p>
          <div :class="{darkDesc: darkMode, lightDesc: lightMode}">
            <p>
              {{
                applicant.surname +
                " " +
                applicant.name +
                " " +
                applicant.patronymic
              }}
            </p>
          </div>
        </div>
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Дата</p>
          <div :class="{darkDesc: darkMode, lightDesc: lightMode}">
            <p>{{ new Date(task.startDate).toLocaleDateString() }}</p>
          </div>
        </div>
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Комментарий</p>
          <div class="comment" :class="{darkDesc: darkMode, lightDesc: lightMode}">
            <p>{{ task.comment }}</p>
          </div>
        </div>
        <div class="error" v-if="error">
          <p>{{ error }}</p>
        </div>
      </div>
      <div class="buttons">
        <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="task.status == 2" @click="checkTask">
          Отметить выполненным
        </button>
        <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="task.status == 3" @click="uncheckTask">
          Убрать выполнение
        </button>
        <button :class="{darkButton: darkMode, lightButton: lightMode}" @click="closePopup">Закрыть</button>
      </div>
    </div>

    <div class="admin" v-if="role == 'admin'">
      <div class="inputs">
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Описание</p>
          <div :class="{darkDesc: darkMode, lightDesc: lightMode}">
            <p>{{ task.problem }}</p>
          </div>
        </div>
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Кабинет</p>
          <div :class="{darkDesc: darkMode, lightDesc: lightMode}">
            <p>{{ task.cabinet }}</p>
          </div>
        </div>
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Заявитель</p>
          <div :class="{darkDesc: darkMode, lightDesc: lightMode}">
            <p>
              {{
                applicant.surname +
                " " +
                applicant.name +
                " " +
                applicant.patronymic
              }}
            </p>
          </div>
        </div>
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Ответственный<span>*</span></p>
          <select :class="{darkSelect: darkMode, lightSelect: lightMode}" v-model="selected_worker">
            <option v-for="worker in workerList" :key="worker">
              {{ worker }}
            </option>
          </select>
        </div>
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Дата</p>
          <div :class="{darkDesc: darkMode, lightDesc: lightMode}">
            <p>{{ new Date(task.startDate).toLocaleDateString() }}</p>
          </div>
        </div>
        <div class="item">
          <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Комментарий</p>
          <textarea
            :class="{darkTextarea: darkMode, lightTextarea: lightMode}"
            cols="30"
            rows="4"
            placeholder="Комментарий"
            v-model="task.comment"
          ></textarea>
        </div>
        <div class="error" v-if="error">
          <p>{{ error }}</p>
        </div>
      </div>
      <div class="buttons">
        <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="!task.worker" @click="selectWorker">
          Подтвердить задание
        </button>
        <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="task.worker" @click="updateWorker">Изменить</button>
        <button :class="{darkButton: darkMode, lightButton: lightMode}" @click="closePopup">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    action: String,

    task: {
      id: Number,
      problem: String,
      applicant: Number,
      cabinet: String,
      description: Number,
      worker: Number,
      status: Number,
      startDate: Date,
      endDate: Date,
      comment: String,
    },
    darkMode: Boolean,
    lightMode: Boolean
  },
  data() {
    return {
      role: "",
      applicant: {},
      workers: [],
      selected_worker: "",
      worker: "",
      error: "",

      problem: "",
      cabinet: "",
    };
  },
  computed: {
    workerList() {
      return this.workers.map(
        (e) => e.id + " " + e.surname + " " + e.name + " " + e.patronymic
      );
    },
  },
  mounted() {
    if(this.task.problem){
      this.problem = this.task.problem;
      this.cabinet = this.task.cabinet;
    }

    if (!this.task.worker) {
      this.selected_worker = "";
    }
    axios
      .post("http://localhost:3000/user/role", {}, { withCredentials: true })
      .then((res) => {
        this.role = res.data;
        if (this.role == "admin" || this.role == "worker") {
          axios
            .get("http://localhost:3000/user/" + String(this.task.applicant), {
              withCredentials: true,
            })
            .then((res) => (this.applicant = res.data));
        }
        if (this.role == "admin") {
          axios
            .get("http://localhost:3000/user", { withCredentials: true })
            .then((res) => {
                this.workers = res.data.filter((us) => us.role == 2);
            });
        }
      });
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", { action: false });
    },
    getWorker(e) {
      console.log(this.selected_worker);
      this.selected_worker = Number(e.split(" ")[0]);
    },
    createTask() {
      if (!this.problem.trim()) {
        this.error = "Опишите проблему!";
      } else if (
        !this.cabinet.trim() ||
        this.cabinet.length > 4 ||
        this.cabinet.length < 3
      ) {
        this.error = "Введите корректный кабинет!";
      } else {
        axios
          .post(
            "http://localhost:3000/task-desc",
            {
              problem: this.problem,
              cabinet: this.cabinet,
            },
            { withCredentials: true }
          )
          .then((res) => {
            let taskDesk = res.data.id;
            axios.post(
              "http://localhost:3000/tasks",
              {
                description: taskDesk,
                status: 1,
              },
              { withCredentials: true }
              ).then(res => this.$emit("closePopup", { popup: false }));
          });
      }
    },
    updateTask() {
      if (!this.problem.trim()) {
        this.error = "Опишите проблему!";
      } else if (
        !this.cabinet.trim() ||
        this.cabinet.length > 4 ||
        this.cabinet.length < 3
      ) {
        this.error = "Введите корректный кабинет!";
      } else {
      axios
        .patch(
          "http://localhost:3000/task-desc/" + this.task.description,
          {
            problem: this.problem,
            cabinet: this.cabinet,
          },
          { withCredentials: true }
        )
        .then(() => this.$emit("closePopup", { popup: false }));
      }
    },
    deleteTask() {
      axios
        .delete("http://localhost:3000/task-desc/" + this.task.description, {
          withCredentials: true,
        })
        .then(() => {
          axios.delete("http://localhost:3000/tasks" + this.task.id, {
            withCredentials: true,
          });
          this.$emit("closePopup", true);
        });
    },
    checkTask() {
      axios
        .patch(
          "http://localhost:3000/tasks/" + this.task.id,
          {
            status: 3,
          },
          { withCredentials: true }
        )
        .then(() => this.$emit("closePopup", { popup: false }));
    },
    uncheckTask() {
      axios
        .patch(
          "http://localhost:3000/tasks/" + this.task.id,
          {
            status: 2,
          },
          { withCredentials: true }
        )
        .then(() => this.$emit("closePopup", { popup: false }));
    },
    selectWorker() {
      if(!this.selected_worker){
        this.error = 'Выберите ответственного!'
      }else{
        axios
          .patch(
            "http://localhost:3000/tasks/" + this.task.id,
            {
              worker: Number(this.selected_worker.split(" ")[0]),
              status: 2,
              comment: this.task.comment,
            },
            { withCredentials: true }
          )
          .then(() => this.$emit("closePopup", { popup: false }));
      }
    },
    updateWorker(){
      axios
        .patch(
          "http://localhost:3000/tasks/" + this.task.id,
          {
            worker: Number(this.selected_worker.split(" ")[0]),
            comment: this.task.comment,
          },
          { withCredentials: true }
        )
        .then(() => this.$emit("closePopup", { popup: false }));
    }
  },
};
</script>

<style scoped>
/* dark mode start */
.darkContainerPopup {
  background: #212121;
  border: #323232 6px solid;
  border-radius: 0.78125vw;
  padding: 2.31481481vh 1.30208333vw;
}

.darkInput {
  background: #323232;
  border: none;
  border-radius: 0.78125vw;
  color: white;
  font-size: 0.833333333vw;
  width: 26.0416667vw;
  height: 4.62962963vh;
  padding-left: 0.833333333vw;
}

.darkTextarea {
  background: #323232;
  border: none;
  border-radius: 0.78125vw;
  color: white;
  font-size: 0.833333333vw;
  width: 25.20833337vw;
  height: 9.25925926vh;
  padding: 1.48148148vh 0.833333333vw;
  resize: none;
  margin-top: 0.462962963vh;
}

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

.darkTitle {
  font-size: 1.04166667vw;
  color: white;
}

.darkDesc {
  background: #323232;
  border: none;
  border-radius: 0.78125vw;
  color: white;
  font-size: 0.833333333vw;
  width: 26.0416667vw;
  padding: 1.48148148vh 0 1.48148148vh 0.833333333vw;
  margin-top: 0.462962963vh;
}

.darkSelect {
  background: #323232;
  border: none;
  border-radius: 0.78125vw;
  color: white;
  font-size: 0.833333333vw;
  width: 26.8749997vw;
  padding: 1.48148148vh 0 1.48148148vh 0.833333333vw;
  margin-top: 0.462962963vh;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  overflow: hidden;
}
/* dark mode end */

/* light mode start */
.lightContainerPopup {
  background: linear-gradient(180deg, #91FAEA 0%, #24CBFF 100%);
  border: #fff 6px solid;
  border-radius: 0.78125vw;
  padding: 2.31481481vh 1.30208333vw;
}

.lightInput {
  background: #fff;
  border: none;
  border-radius: 0.78125vw;
  color: black;
  font-size: 0.833333333vw;
  width: 26.0416667vw;
  height: 4.62962963vh;
  padding-left: 0.833333333vw;
}

.lightTextarea {
  background: #fff;
  border: none;
  border-radius: 0.78125vw;
  color: black;
  font-size: 0.833333333vw;
  width: 25.20833337vw;
  height: 9.25925926vh;
  padding: 1.48148148vh 0.833333333vw;
  resize: none;
  margin-top: 0.462962963vh;
}

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

.lightTitle {
  font-size: 1.04166667vw;
  color: black;
  font-weight: 500;
}

.lightDesc {
  background: #fff;
  border: none;
  border-radius: 0.78125vw;
  color: black;
  font-size: 0.833333333vw;
  width: 26.0416667vw;
  padding: 1.48148148vh 0 1.48148148vh 0.833333333vw;
  margin-top: 0.462962963vh;
}

.lightSelect {
  background: #fff;
  border: none;
  border-radius: 0.78125vw;
  color: black;
  font-size: 0.833333333vw;
  width: 26.8749997vw;
  padding: 1.48148148vh 0 1.48148148vh 0.833333333vw;
  margin-top: 0.462962963vh;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  overflow: hidden;
}
/* light mode end */

.user {
  display: flex;
  flex-direction: column;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 1.85185185vh;
}

input::placeholder {
  font-size: 0.833333333vw;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2.77777778vh;
}

.comment {
  height: 9.25925926vh;
}

.select::-ms-expand {
  display: none;
}

.select::after {
  content: "\258C";
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 1em;
}

.comment::placeholder {
  position: absolute;
  top: 1.48148148vh;
  word-wrap: normal;
}

.error {
  width: 26.0416667vw;
  padding: 1.48148148vh 0 1.48148148vh 0.833333333vw;
  background: rgba(106, 8, 8, 1);
  border: none;
  border-radius: 0.78125vw;
  color: white;
  font-size: 0.833333333vw;
  margin-top: 0.462962963vh;
}
span{
        color: rgb(187, 15, 15);
    }
</style>
