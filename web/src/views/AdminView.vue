<template>
    <div class="box">
        <div class="admin__bar">
          <p>Действие:</p>
          <router-link  class="clickable" to="/admin">Пользователи</router-link>
          <router-link  class="clickable" to="/statistic">Статистика</router-link>
        </div>
        <router-view @toTask="toTask" />
    </div>
</template>

<script>
    export default {
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

.admin__bar{
    width: 33.125vw;
    background-color: #323232;
    padding: 1.57407407vh 0.885416667vw;
    display: flex;
    gap: 1.04166667vw;
    border-radius: 0.78125vw;
}

p{
  color: white;
  font-size: 0.78125vw;
  font-weight: 700;
}

.clickable{
    font-size: 0.729166667vw;
    font-weight: 500;
    color: white;
    text-decoration: none;
}
.clickable:hover{
    color: #14FFEC;
    cursor: pointer;
}
    .box{
        display: flex;
        flex-direction: column;
        gap: 30px;
        align-items: start;
        justify-content: start;
    }
</style>