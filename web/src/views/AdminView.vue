<template>
    <div class="box">
        <AdminBar />
        <div class="button__panel">
            <p class="action">Создание</p>
            <button v-if="createUser">Создать</button>
            <button @click="toTask">Задания</button>
        </div>
        <CreateUser v-if="createUser" />
    </div>
</template>

<script>
import AdminBar from '../components/AdminBar.vue';
import CreateUser from '../components/CreateUser.vue';

    export default {
    components: { AdminBar, CreateUser },
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
    .box{
        display: flex;
        flex-direction: column;
        gap: 30px;
        align-items: start;
    }
    .button__panel {
  width: 34.8958333vw;
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 2.77777778vh;
  margin-bottom: 1.85185185vh;
}
button {
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

button:hover {
  color: rgba(20, 255, 236, 1);
}

button:active {
  box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5),
    inset 0px -5px 12px rgba(0, 0, 0, 0.5);
}

.action{
  font-size: 2.08333333vw;
  color: white;
}
</style>