<template>
    <div class="tasks">
        <div v-for="user in users" :key="user">
            <user :user="user" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import User from './User.vue'
    export default {
        components: { User },
        data(){
            return{
                users: []
            }
        },
        mounted(){
            axios
                .get("http://localhost:3000/user",
                { withCredentials: true, "Access-Control-Allow-Origin": "http://localhost:3000" })
                .then(res => this.users = res.data)
        }
    }
</script>

<style scoped>
    .tasks{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }
</style>