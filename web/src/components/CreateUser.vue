<template>
    <div class="container">
        <div class="top">
            <div class="file">
                <p class="title">Изображение</p>
                <input type="file" class="file_loader" name="image" accept="image/*" ref="file" id="file">
            </div>
            <button @click="createUser">Создать</button>
        </div>

        <div class="wrapper">
            <div class="column">
                <div class="item">
                    <p class="title">Имя</p>
                    <input type="text" v-model="name" placeholder="Имя" class="input">
                </div>
                <div class="item">
                    <p class="title">Фамилия</p>
                    <input type="text" v-model="surname" placeholder="Фамилия" class="input">
                </div>
                <div class="item">
                    <p class="title">Отчество</p>
                    <input type="text" v-model="patronymic" placeholder="Отчество" class="input">
                </div>
            </div>
            <div class="column">
                <div class="item">
                    <p class="title">Роль</p>
                    <select v-model="role">
                        <option v-for="role in roleList" :key="role" selected>{{ role }}</option>
                    </select>
                </div>
                <div class="item">
                    <p class="title">Логин</p>
                    <input type="text" v-model="login" placeholder="Логин" class="input">
                </div>
                <div class="item">
                    <p class="title">Пароль</p>
                    <input type="text" v-model="password" placeholder="Пароль" class="input">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return{
                name: '',
                surname: '',
                patronymic: '',
                role: '',
                login: '',
                password: '',
                file: '',

                roles: []
            }
        },
        methods:{
            createUser(){
                axios
                .post("http://localhost:3000/user",
                    { 
                        name: this.name,
                        surname: this.surname,
                        patronymic: this.patronymic,
                        role: this.role.split(' ')[0],
                        password: this.password,
                        login: this.login

                    },
                    { withCredentials: true, headers: {"Access-Control-Allow-Origin": "http://localhost:3000", 'Content-Type': 'multipart/form-data'} }
                )
                .then((res) => {});
            }
        },
        mounted(){
            axios
                .get(
                    "http://localhost:3000/role",
                    { withCredentials: true }
                )
                .then((res) => {
                    this.roles = res.data;
                });
        },
        computed: {
            roleList(){
                return this.roles.map(el => el.id + ' ' + el.role_name)
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 31.770833vw;
        height: 41.6666667vh;
        background: #323232;
        border-radius: 0.78125vw;
        padding: 1.5625vw;
    }
    .wrapper{
        display: flex;
        justify-content: space-between;
        margin-top: 30px;   
    }
    .column{
        display: flex;
        flex-direction: column;
        gap: 1.38888889vh;
    }
    .title{
        font-size: 1.04166667vw;
        color: white;
    }
    .input{
        width: 8.75vw;
        padding: 0.833333333vw;
        background: #212121;
        border-radius: 15px; 
        border: none;
        margin-top: 5px;
        color: white;   
    }
    select{
        width: 10.4166667vw;
        padding: 0.833333333vw;
        background: #212121;
        border-radius: 15px; 
        border: none;
        margin-top: 5px;
        color: white; 
    }
    option{
        color: white;
    }
    .file_loader{
        color: white;
        margin-top: 5px;
    }
    .top{
        display: flex;
        justify-content: space-between;
        align-items: end;
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
</style>