<template>
    <div>
        <div class="worker">
            <div class="column">
                <div class="item">
                    <p class="title">Имя:</p>
                    <p class="desc">{{ worker.name }}</p>
                </div>
                <div class="line"></div>
                <div class="item">
                    <p class="title">Фамилия:</p>
                    <p class="desc">{{ worker.surname }}</p>
                </div>
            </div>
            <div class="column">
                <div class="item">
                    <p class="title">Отчество:</p>
                    <p class="desc">{{ worker.patronymic }}</p>
                </div>
                <div class="line"></div>
                <div class="item">
                    <p class="title">Всего заданий:</p>
                    <p class="desc">{{allTasks}}</p>
                </div>
            </div>
            <div class="column">
                <div class="item">
                    <p class="title">Выполнено <br>заданий:</p>
                    <p class="desc">{{ completedTasks }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        props: {worker: Object},
        data() {
            return {
                tasks: []
            }
        },
        mounted() {
            axios
                .post(
                    "http://localhost:3000/tasks/all",
                    { "Access-Control-Allow-Origin": "http://localhost:3000" },
                    { withCredentials: true }
                )
                .then((res) => (this.tasks = res.data));
        },

        computed: {
            allTasks(){
                return this.tasks.reduce((acc, el) => el.worker == this.worker.id ? acc + 1 : acc, 0)
            },
            completedTasks(){
                return this.tasks.reduce((acc, el) => el.worker == this.worker.id && el.status == 3 ? acc + 1 : acc, 0)
            }
        }
    }
</script>

<style scoped>
    .worker{
        display: flex;
        align-items: start;
        background-color: #323232;
        color: white;
        border-radius: 0.78125vw;
        padding: 2.40740741vh 1.35416667vw;
        justify-content: space-between;
        width: 32.1875;
    }
    .item{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .line{
        height: 1px;
        width: 7vw;
        background-color: white;
    }
    .column{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .desc{
        font-size: 14px;
        font-weight: 300;
    }
</style>