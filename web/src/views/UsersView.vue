<template>
    <div class="users__container">
        <div class="button__panel">
            <p class="action">{{action}}</p>
            <button v-if="!createUser" @click="toggleCreate">Создать</button>
            <button v-if="createUser" @click="toggleCreate">Назад</button>
            <button @click="toTask">Задания</button>
        </div>
        <CreateUser v-if="createUser" :user="user" @toggleCreate="toggleCreate" />
        <users v-if="!createUser" @detailUser="detailUser($event)" />
    </div>
</template>

<script>
import CreateUser from '../components/CreateUser.vue';
import Users from '../components/Users.vue';
    export default {
        components: {CreateUser, Users},
        data(){
            return{
                action: 'Пользователи',
                createUser: false,
                user: {}
            }
        },
        methods:{
        toTask(){
            this.$emit('toTask')
        },
        toggleCreate(e){
            this.createUser = !this.createUser
            if(this.action == 'Пользователи'){
                this.action = 'Создать'
            }else{
                this.action = 'Пользователи'
                this.user = {}
            }
        },
        detailUser(user){
            this.createUser = !this.createUser
            this.action = 'Изменить',
            this.user = user
        }
        }
    }
</script>

<style scoped>
    .users__container{
        width: 32.1875vw;
    }
    .button__panel {
  width: 34.8958333vw;
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 30px;
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

.viniet {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>