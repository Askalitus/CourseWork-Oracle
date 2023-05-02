<template>
    <div class="box">
        <div :class="{darkAdmin__bar: darkMode, lightAdmin__bar: lightMode}">
          <p :class="{darkP: darkMode, lightP: lightMode}">Действие:</p>
          <router-link  :class="{darkClickable: darkMode, lightClickable: lightMode}" to="/admin">Пользователи</router-link>
          <router-link  :class="{darkClickable: darkMode, lightClickable: lightMode}" to="/statistic">Статистика</router-link>
        </div>
        <router-view @toTask="toTask" :darkMode="darkMode" :lightMode="lightMode" />
    </div>
</template>

<script>
    export default {
      props: {darkMode: Boolean, lightMode: Boolean},
    data(){
      return{
        createUser: true
      }
    },
    methods:{
      toTask(){
        this.$emit('toTask')
      }
    }
}
</script>

<style scoped>
/* dark mode start */
.darkAdmin__bar{
    width: 33.125vw;
    background-color: #323232;
    padding: 1.57407407vh 0.885416667vw;
    display: flex;
    gap: 1.04166667vw;
    border-radius: 0.78125vw;
}

.darkP{
  color: white;
  font-size: 0.78125vw;
  font-weight: 700;
}

.darkClickable{
    font-size: 0.729166667vw;
    font-weight: 500;
    color: white;
    text-decoration: none;
}
.darkClickable:hover{
    color: #14FFEC;
    cursor: pointer;
}
/* dark mode end */

/* light mode start */
.lightAdmin__bar{
    width: 33.125vw;
    background-color: #fff;
    padding: 1.57407407vh 0.885416667vw;
    display: flex;
    gap: 1.04166667vw;
    border-radius: 0.78125vw;
}

.lightP{
  color: black;
  font-size: 0.78125vw;
  font-weight: 700;
}

.lightClickable{
    font-size: 0.729166667vw;
    font-weight: 500;
    color: black;
    text-decoration: none;
}
.lightClickable:hover{
    color: #119DA6;
    cursor: pointer;
}
/* light mode end */
    .box{
        display: flex;
        flex-direction: column;
        gap: 30px;
        align-items: start;
        justify-content: start;
    }
</style>