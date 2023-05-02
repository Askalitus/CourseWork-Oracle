<template>
  <div :class="{darkCard: darkMode, lightCard: lightMode}">
    <img :src="('http://localhost:3000/photo/' + photoURL)" onerror="this.src='../src/assets/404.jpg'" class="img">
    <div class="text">
        <p :class="{darkP: darkMode, lightP: lightMode}">{{ userData.name }}</p>
        <p :class="{darkP: darkMode, lightP: lightMode}">{{ userData.surname }}</p>
        <p :class="{darkP: darkMode, lightP: lightMode}">{{ userData.patronymic }}</p>
        <button :class="{darkButton: darkMode, lightButton: lightMode}" @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props: {darkMode: Boolean, lightMode: Boolean},
    data(){
        return {
            userData: {},
            photoURL: ''
        }
    },

    mounted(){
        this.userData = JSON.parse(localStorage.user)
        this.photoURL = this.userData.photo
    },

    methods: {
        logout(){
        axios
            .post('http://localhost:3000/logout', {
                "Access-Control-Allow-Origin": "http://localhost:3000/login"
            }, {withCredentials: true})
            .then(response => {
                localStorage.user = JSON.stringify({})
                this.$router.push('/')})
        }
    }
}
</script>

<style scoped>
/* dark mode start */
    .darkCard{
        width: 19.2708333vw;
        height: 61.8518519vh;
        background-color: #323232;
        border-radius: 0.78125vw;
        padding-bottom: 1.85185185vh;
    }

    .darkP{
        font-size: 1.66666667vw;
        color: white;
        font-weight: 300;
    }

    .darkButton{
    width: 7.8125vw;
    height: 4.62962962963vh;
    background: #212121;
    box-shadow: inset 0px 6px 10px rgba(63, 63, 63, 0.5), inset 0px -3px 10px rgba(0, 0, 0, 0.5);
    border-radius: 0.78125vw;
    border: none;
    color: white;
    font-size: 0.8333333333333vw;
    cursor: pointer;
    margin-top: 3.7037037vh;
    }
    .darkButton:hover{
    color: rgba(20, 255, 236, 1);
    }
    .darkButton:active{
    box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5), inset 0px -5px 12px rgba(0, 0, 0, 0.5);
    }

/* dark mode end */

/* light mode start */
.lightCard{
        width: 19.2708333vw;
        height: 61.8518519vh;
        background-color: #fff;
        border-radius: 0.78125vw;
        padding-bottom: 1.85185185vh;
    }

    .lightP{
        font-size: 1.66666667vw;
        color: black;
        font-weight: 500;
    }

    .lightButton{
    width: 7.8125vw;
    height: 4.62962962963vh;
    background: #0DCEDA;
    box-shadow: inset 0px 6px 10px #69F6FF, inset 0px -3px 10px #119DA6;
    border-radius: 0.78125vw;
    border: none;
    color: white;
    font-size: 0.8333333333333vw;
    cursor: pointer;
    margin-top: 3.7037037vh;
    font-weight: 700;
    }
    .lightButton:hover{
    color: black;
    }
    .lightButton:active{
    box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5), inset 0px -5px 12px rgba(0, 0, 0, 0.5);
    }

/* light mode end */
    .img{
        width: 19.2708333vw;
        height: 37.037037vh;
        border-radius: 0.78125vw 0.78125vw 0 0;
    }
    .text{
        display: flex;
        flex-direction: column;
        margin-left: 1.04166667vw;
        margin-top: 1.85185185vh;
        margin-bottom: 1.85185185vh;
        gap: 0.925925926vh;
    }
</style>