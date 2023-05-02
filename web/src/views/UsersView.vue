<template>
    <div class="users__container">
        <div class="button__panel">
            <p :class="{darkAction: darkMode, lightAction: lightMode}">{{action}}</p>
            <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="!createUser" @click="toggleCreate">Создать</button>
            <button :class="{darkButton: darkMode, lightButton: lightMode}" v-if="createUser" @click="toggleCreate">Назад</button>
            <button :class="{darkButton: darkMode, lightButton: lightMode}" @click="toTask">Задания</button>
        </div>
        <CreateUser v-if="createUser" :user="user" @toggleCreate="toggleCreate" :darkMode="darkMode" :lightMode="lightMode" />
        <users v-if="!createUser" @detailUser="detailUser($event)" :darkMode="darkMode" :lightMode="lightMode" />
    </div>
</template>

<script>
import CreateUser from '../components/CreateUser.vue';
import Users from '../components/Users.vue';
    export default {
        props: {darkMode: Boolean, lightMode: Boolean},
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

.darkAction{
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

.lightAction{
  font-size: 2.08333333vw;
  color: black;
}
/* light mode end */
    .users__container{
        width: 32.1875vw;
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
    .button__panel {
  width: 34.8958333vw;
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 30px;
}
</style>