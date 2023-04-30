<template>
    <div class="users">
        <input type="text" v-model="search" class="search" placeholder="Поиск по ФИО">
        <div v-for="user in searchResult" :key="user">
            <user :user="user" @updateUserList="updateUserList" @detailUser="detailUser($event)" />
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
                users: [],
                search: '',
                user: {},
            }
        },
        mounted(){
            axios
                .get("http://localhost:3000/user",
                { withCredentials: true, "Access-Control-Allow-Origin": "http://localhost:3000" })
                .then(res => this.users = res.data)
        },
        computed: {
            searchResult(){
                if(this.search.split(' ')[2]){
                    return this.users.filter(el => el.surname.includes(this.search.split(' ')[0]) && el.name.includes(this.search.split(' ')[1]) && el.patronymic.includes(this.search.split(' ')[2]))
                }
                else if(this.search.split(' ')[1]){
                    return this.users.filter(el => el.surname.includes(this.search.split(' ')[0]) && el.name.includes(this.search.split(' ')[1]))
                }
                else if(this.search.split(' ')[0].length > 0){
                    return this.users.filter(el => el.surname.includes(this.search.split(' ')[0]))
                }
                else{
                    return this.users
                }
            }
        },
        methods: {
            updateUserList(){
            axios
                .get("http://localhost:3000/user",
                { withCredentials: true, "Access-Control-Allow-Origin": "http://localhost:3000" })
                .then(res => this.users = res.data)
        },
        detailUser(user){
            this.$emit('detailUser', user)
        }
        }
    }
</script>

<style scoped>
    .users{
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }
    .search{
    width: 33.2291667vw;
    padding: 0.833333333vw;
    background: #323232;
    border-radius: 15px; 
    border: none;
    color: white;
}
</style>