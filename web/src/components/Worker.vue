<template>
    <div>
        <div :class="{darkWorker: darkMode, lightWorker: lightMode}">
            <div class="column">
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Имя:</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{ worker.name }}</p>
                </div>
                <div :class="{darkLine: darkMode, lightLine: lightMode}"></div>
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Фамилия:</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{ worker.surname }}</p>
                </div>
            </div>
            <div class="column">
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Отчество:</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{ worker.patronymic }}</p>
                </div>
                <div :class="{darkLine: darkMode, lightLine: lightMode}"></div>
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Всего заданий:</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{allTasks}}</p>
                </div>
            </div>
            <div class="column">
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Выполнено <br>заданий:</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{ completedTasks }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        props: {worker: Object, darkMode: Boolean, lightMode: Boolean},
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
/* dark mode start */
    .darkWorker{
        display: flex;
        align-items: start;
        background-color: #323232;
        color: white;
        border-radius: 0.78125vw;
        padding: 2.40740741vh 1.35416667vw;
        justify-content: space-between;
        width: 32.1875;
    }
    .darkLine{
        height: 1px;
        width: 7vw;
        background-color: white;
    }
/* dark mode end */

/* light mode start */
.lightWorker{
        display: flex;
        align-items: start;
        background-color: #fff;
        color: black;
        border-radius: 0.78125vw;
        padding: 2.40740741vh 1.35416667vw;
        justify-content: space-between;
        width: 32.1875;
    }
    .lightLine{
        height: 1px;
        width: 7vw;
        background-color: black;
    }
/* light mode end */
    .item{
        display: flex;
        flex-direction: column;
        gap: 5px;
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