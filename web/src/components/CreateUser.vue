<template>
    <div :class="{darkContainer: darkMode, lightContainer: lightMode}">
        <div class="error" v-if="error">
            <p>{{ error }}</p>
        </div>
        <div class="top">
            <div class="file">
                <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Изображение</p>
                <input type="file" :class="{darkFile_loader: darkMode, lightFile_loader: lightMode}" name="image" accept="image/*" ref="file" id="file">
            </div>
            <button :class="{darkButton: darkMode, lightButton: lightMode}" @click="createUser" v-if="!user.name">Создать</button>
            <button :class="{darkButton: darkMode, lightButton: lightMode}" @click="updateUser" v-if="user.name">Изменить</button>
        </div>

        <div class="wrapper">
            <div class="column">
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Имя<span>*</span></p>
                    <input type="text" v-model="name" placeholder="Имя" :class="{darkInput: darkMode, lightInput: lightMode}">
                </div>
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Фамилия<span>*</span></p>
                    <input type="text" v-model="surname" placeholder="Фамилия" :class="{darkInput: darkMode, lightInput: lightMode}">
                </div>
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Отчество<span>*</span></p>
                    <input type="text" v-model="patronymic" placeholder="Отчество" :class="{darkInput: darkMode, lightInput: lightMode}">
                </div>
            </div>
            <div class="column">
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Роль<span>*</span></p>
                    <select v-model="role" :class="{darkSelect: darkMode, lightSelect: lightMode}">
                        <option v-for="role in roleList" :key="role" selected>{{ role }}</option>
                    </select>
                </div>
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Логин<span>*</span></p>
                    <input type="text" v-model="login" placeholder="Логин" :class="{darkInput: darkMode, lightInput: lightMode}">
                </div>
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Пароль<span>*</span></p>
                    <input type="text" v-model="password" placeholder="Пароль" :class="{darkInput: darkMode, lightInput: lightMode}">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        props: { user: Object, darkMode: Boolean, lightMode: Boolean },
        data(){
            return{
                name: '',
                surname: '',
                patronymic: '',
                role: '',
                login: '',
                password: '',
                file: '',
                userInfo: {},

                roles: [],
                error: '',
                users: []
            }
        },
        methods:{
            createUser(){
                if(!this.name || !this.surname || !this.patronymic || !this.role || !this.login || !this.password){
                    this.error = 'Заполните все обязательные поля!'
                }
                else if (this.password.trim().length < 8){
                    this.error = 'В пароле должно быть 8 и более символов!'
                }
                else if(this.loginList.some(el => el == this.login)){
                    this.error = 'Пользователь с таким логином уже существует!'
                }
                else{
                    axios
                    .post("http://localhost:3000/user",
                        { 
                            name: this.name.trim(),
                            surname: this.surname.trim(),
                            patronymic: this.patronymic.trim(),
                            role: this.role.split(' ')[0],
                            password: this.password.trim(),
                            login: this.login.trim()

                        },
                        { withCredentials: true, headers: {"Access-Control-Allow-Origin": "http://localhost:3000", 'Content-Type': 'multipart/form-data'} }
                    )
                    .then((res) => {this.$emit('toggleCreate')});
                }
            },
            updateUser(){
                let role = ''
                if(!this.role){
                    role = this.user.role 
                }else{
                    role = this.role.split(' ')[0]
                }
                axios
                .patch("http://localhost:3000/user/" + this.user.id,
                    { 
                        name: this.name,
                        surname: this.surname,
                        patronymic: this.patronymic,
                        role: role,
                        password: this.password,
                        login: this.login
                    },
                    { withCredentials: true, headers: {"Access-Control-Allow-Origin": "http://localhost:3000" }}
                )
                .then((res) => {this.$emit('toggleCreate')});
            }
        },
        mounted(){
            axios
                .get("http://localhost:3000/user",
                { withCredentials: true, "Access-Control-Allow-Origin": "http://localhost:3000" })
                .then(res => this.users = res.data)

            if(this.user){
                this.name = this.user.name
                this.surname = this.user.surname
                this.patronymic = this.user.patronymic
                this.login = this.user.login
            }
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
            },
            loginList(){
                return this.users.map(el => el.login)
            }
        }
    }
</script>

<style scoped>
/* dark mode start */
.darkContainer{
        height: auto;
        width: 31.770833vw;
        background: #323232;
        border-radius: 0.78125vw;
        padding: 1.5625vw;
    }
    .darkTitle{
        font-size: 1.04166667vw;
        color: white;
    }
    .darkInput{
        width: 8.75vw;
        padding: 0.833333333vw;
        background: #212121;
        border-radius: 15px; 
        border: none;
        margin-top: 5px;
        color: white;   
    }
    .darkSelect{
        width: 10.4166667vw;
        padding: 0.833333333vw;
        background: #212121;
        border-radius: 15px; 
        border: none;
        margin-top: 5px;
        color: white; 
    }
    .darkSelect option{
        color: white;
    }
    .darkFile_loader{
        color: white;
        margin-top: 5px;
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
/* dark mode end */

/* light mode start */
.lightContainer{
        height: auto;
        width: 31.770833vw;
        background: #fff;
        border-radius: 0.78125vw;
        padding: 1.5625vw;
    }
    .lightTitle{
        font-size: 1.04166667vw;
        color: black;
    }
    .lightInput{
        width: 8.75vw;
        padding: 0.833333333vw;
        background: #0DCEDA;
        border-radius: 15px; 
        border: none;
        margin-top: 5px;
        color: black;   
    }
    .lightSelect{
        width: 10.4166667vw;
        padding: 0.833333333vw;
        background: #0DCEDA;
        border-radius: 15px; 
        border: none;
        margin-top: 5px;
        color: black; 
    }
    .lightSelect option{
        color: black;
    }
    .lightFile_loader{
        color: black;
        margin-top: 5px;
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
/* light mode end */
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
    .top{
        display: flex;
        justify-content: space-between;
        align-items: end;
    }

    .error {
    width: 100%;
    padding: 1.48148148vh 0 1.48148148vh 0.833333333vw;
    background: rgba(106, 8, 8, 1);
    border: none;
    border-radius: 0.78125vw;
    color: white;
    font-size: 0.833333333vw;
    margin-bottom: 10px;
    }
    span{
        color: rgb(187, 15, 15);
    }
</style>