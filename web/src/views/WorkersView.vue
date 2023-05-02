<template>
    <div class="workers">
        <div v-for="worker in workersList" :key="worker.id">
            <worker :worker="worker" :darkMode="darkMode" :lightMode="lightMode" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Worker from '../components/Worker.vue';

    export default {
  components: { Worker },
  props: {darkMode: Boolean, lightMode: Boolean},
        data() {
            return {
                users: []
            }
        },
        mounted() {
            axios
                .get("http://localhost:3000/user",
                { withCredentials: true, "Access-Control-Allow-Origin": "http://localhost:3000" })
                .then(res => this.users = res.data)
        },

        computed: {
            workersList(){
                return this.users.filter(el => el.role == 2)
            }
        }
    }
</script>

<style scoped>
    .workers{
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 30px;
    }
</style>