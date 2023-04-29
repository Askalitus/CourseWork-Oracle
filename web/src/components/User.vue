<template>
    <div>
        <div class="user">
            <div class="item">
                <p class="title">Имя</p>
                <p class="desc">{{ user.name }}</p>
            </div>
            <div class="item">
                <p class="title">Фамилия</p>
                <p class="desc">{{ user.surname }}</p>
            </div>
            <div class="item">
                <p class="title">Отчество</p>
                <p class="desc">{{ user.patronymic }}</p>
            </div>
            <div class="item">
                <p class="title">Роль</p>
                <p class="desc">{{ role }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        props: {user: Object},
        data(){
            return{
                role: ''
            }
        },  
        mounted(){
            axios
            .get(
                "http://localhost:3000/role/" + this.user.role,
                { withCredentials: true, "Access-Control-Allow-Origin": "http://localhost:3000" }
            )
            .then((res) => {
                this.role = res.data.role_name;
            });
        }
    }
</script>

<style scoped>
    .user{
        display: flex;
        background-color: #323232;
        color: white;
        border-radius: 0.78125vw;
        padding: 2.40740741vh 1.35416667vw;
        justify-content: space-between;
        width: 100%;
    }
</style>