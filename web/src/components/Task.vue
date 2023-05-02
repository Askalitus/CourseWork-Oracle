<template>
  <div :class="{darkTask: darkMode, lightTask: lightMode}">
    <div class="item">
      <p class="title">Описание</p>
      <p class="desc">{{ shortText }}</p>
    </div>
    <div class="item">
      <p class="title">Дата</p>
      <p>{{ noTime }}</p>
    </div>
    <div class="item">
      <p class="title">Кабинет</p>
      <p>{{ task.cabinet }}</p>
    </div>
    <div class="item">
      <p class="title">Состояние</p>
      <p :class="{ green: statusName == 'Готово', yellow: statusName == 'Принято', orange: statusName == 'В обработке'}">{{ statusName }}</p>
    </div>
    <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="this.role == 'user'" @click="updateTaskPopup">
      <svg width="20" height="20" viewBox="0 0 248 248" xmlns="http://www.w3.org/2000/svg">
        <path d="M180.066 31.3391C177.354 31.993 176.652 32.5742 166.334 42.843C160.885 48.2437 156.453 52.7727 156.453 52.918C156.453 53.0391 165.123 61.8305 175.707 72.4141L194.961 91.668L205.012 81.6172C215.959 70.6703 216.201 70.4039 216.806 67.1344C217.024 65.9477 217.024 65.1969 216.806 63.9133C216.201 60.3531 216.322 60.5227 201.791 45.9914C190.505 34.7297 188.349 32.6711 187.211 32.1625C184.741 31.0242 182.416 30.7578 180.066 31.3391Z"/>
        <path d="M88.0836 121.045L31 178.129V197.552V217H50.3266H69.6289L126.858 159.795L184.062 102.566L164.76 83.2641C154.128 72.632 145.385 63.9375 145.312 63.9375C145.24 63.9375 119.495 89.6336 88.0836 121.045Z"/>
      </svg>
    </button>
    <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="this.role == 'admin'" @click="adminPopup">
      <svg width="30" height="24" viewBox="0 0 30 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.46249 10.2337C7.20749 10.2727 7.01849 10.3342 6.81599 10.4407C6.34799 10.6897 6.02399 11.1247 5.89949 11.6677C5.88149 11.7457 5.87549 11.8477 5.87549 12.0247C5.87549 12.2017 5.88149 12.3037 5.89949 12.3817C6.06749 13.1182 6.61199 13.6522 7.34249 13.7962C7.49699 13.8277 7.86599 13.8232 8.02499 13.7887C8.76449 13.6297 9.33149 13.0342 9.44249 12.2992C9.58349 11.3617 8.98199 10.4797 8.05499 10.2682C7.93049 10.2397 7.56449 10.2187 7.46249 10.2337Z"/>
        <path d="M14.7975 10.2339C14.5455 10.2729 14.3745 10.3269 14.1705 10.4319C13.695 10.6749 13.3515 11.1279 13.236 11.6649C13.215 11.7579 13.209 11.8554 13.209 12.0249C13.209 12.3579 13.257 12.5649 13.407 12.8544C13.65 13.3299 14.103 13.6734 14.64 13.7889C14.817 13.8279 15.183 13.8279 15.36 13.7889C16.0695 13.6359 16.611 13.0929 16.764 12.3849C16.803 12.2079 16.803 11.8419 16.764 11.6649C16.6125 10.9644 16.083 10.4259 15.39 10.2684C15.2655 10.2399 14.8995 10.2189 14.7975 10.2339Z"/>
        <path d="M22.1325 10.2339C21.8805 10.2729 21.7095 10.3269 21.5055 10.4319C21.003 10.6884 20.6415 11.1924 20.5575 11.7504C20.4135 12.6999 21.03 13.5849 21.975 13.7889C22.134 13.8234 22.503 13.8279 22.6575 13.7964C23.025 13.7244 23.343 13.5549 23.604 13.2939C23.859 13.0389 24.0165 12.7494 24.1005 12.3819C24.135 12.2289 24.135 11.8209 24.1005 11.6679C23.9385 10.9539 23.4195 10.4274 22.725 10.2684C22.6005 10.2399 22.2345 10.2189 22.1325 10.2339Z"/>
      </svg>
    </button>
    <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="this.role == 'worker'" @click="workerPopup">
      <svg width="30" height="24" viewBox="0 0 30 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.46249 10.2337C7.20749 10.2727 7.01849 10.3342 6.81599 10.4407C6.34799 10.6897 6.02399 11.1247 5.89949 11.6677C5.88149 11.7457 5.87549 11.8477 5.87549 12.0247C5.87549 12.2017 5.88149 12.3037 5.89949 12.3817C6.06749 13.1182 6.61199 13.6522 7.34249 13.7962C7.49699 13.8277 7.86599 13.8232 8.02499 13.7887C8.76449 13.6297 9.33149 13.0342 9.44249 12.2992C9.58349 11.3617 8.98199 10.4797 8.05499 10.2682C7.93049 10.2397 7.56449 10.2187 7.46249 10.2337Z"/>
        <path d="M14.7975 10.2339C14.5455 10.2729 14.3745 10.3269 14.1705 10.4319C13.695 10.6749 13.3515 11.1279 13.236 11.6649C13.215 11.7579 13.209 11.8554 13.209 12.0249C13.209 12.3579 13.257 12.5649 13.407 12.8544C13.65 13.3299 14.103 13.6734 14.64 13.7889C14.817 13.8279 15.183 13.8279 15.36 13.7889C16.0695 13.6359 16.611 13.0929 16.764 12.3849C16.803 12.2079 16.803 11.8419 16.764 11.6649C16.6125 10.9644 16.083 10.4259 15.39 10.2684C15.2655 10.2399 14.8995 10.2189 14.7975 10.2339Z"/>
        <path d="M22.1325 10.2339C21.8805 10.2729 21.7095 10.3269 21.5055 10.4319C21.003 10.6884 20.6415 11.1924 20.5575 11.7504C20.4135 12.6999 21.03 13.5849 21.975 13.7889C22.134 13.8234 22.503 13.8279 22.6575 13.7964C23.025 13.7244 23.343 13.5549 23.604 13.2939C23.859 13.0389 24.0165 12.7494 24.1005 12.3819C24.135 12.2289 24.135 11.8209 24.1005 11.6679C23.9385 10.9539 23.4195 10.4274 22.725 10.2684C22.6005 10.2399 22.2345 10.2189 22.1325 10.2339Z"/>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  data(){
    return{
    }
  },
  props: {task: {
    id: Number,
    problem: String,
    applicant: Number,
    cabinet: String,
    description: Number,
    worker: Number,
    status: Number,
    startDate: Date,
    endDate: Date,
    comment: String
  },
    role: String,
    darkMode: Boolean,
    lightMode: Boolean},
  computed: {
    noTime(){
      let date = new Date(this.task.startDate)
      return date.toLocaleDateString()
    },
    shortText(){
      if(this.task.problem.length > 20){
        return this.task.problem.substr(0, 16) + '...'
      }else{
        return this.task.problem
      }
    },
    statusName(){
      if(this.task.status == 2){
        return 'Принято'
      }
      if(this.task.status == 3){
        return 'Готово'
      }
      if(this.task.status == 1){
        return 'В обработке'
      }
    }
  },
  methods: {
    updateTaskPopup(){
      this.$emit('updateTaskPopup', this.task)
    },
    workerPopup(){
      this.$emit('workerPopup', this.task)
    },
    adminPopup(){
      this.$emit('adminPopup', this.task)
    }
  },
}
</script>

<style scoped>
/* dark mode start */
.darkTask{
  display: flex;
  background-color: #323232;
  color: white;
  border-radius: 0.78125vw;
  padding: 2.40740741vh 1.35416667vw;
  justify-content: space-between;
}

.darkButton{
  width: 2.08333333vw;
  height: 2.08333333vw;
  border-radius: 100%;
  box-shadow: inset 0px 6px 10px rgba(63, 63, 63, 0.5), inset 0px -3px 10px rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  background: #212121;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #119DA6;
}

.darkButton:hover path{
  fill: #14FFEC;
}

.darkButton:active{
  box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5), inset 0px -5px 12px rgba(0, 0, 0, 0.5);
}

/* dark mode end */

/* light mode start */
.lightTask{
  display: flex;
  background-color: #fff;
  color: black;
  border-radius: 0.78125vw;
  padding: 2.40740741vh 1.35416667vw;
  justify-content: space-between;
}

.lightButton{
  width: 2.08333333vw;
  height: 2.08333333vw;
  border-radius: 100%;
  box-shadow: inset 0px 6px 10px #69F6FF, inset 0px -3px 10px #119DA6;
  border: none;
  cursor: pointer;
  background: #0DCEDA;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #fff;
}

.lightButton:hover path{
  fill: black;
}

.lightButton:active{
  box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5), inset 0px -5px 12px rgba(0, 0, 0, 0.5);
}

/* light mode end */

.title{
  font-size: 1.04166667vw;
  margin-bottom: 0.925925926vh;
}

p{
  font-size: 0.729166667vw;
}

svg{
  width: 1.04166667vw;
  height: 1.04166667vw;
}

.orange{
  color: #DD6A00;
}

.yellow{
  color: #CEBA00;
}

.green{
  color: #27C500;
}

.desc{
  width: 10.5809663vw;
}
</style>