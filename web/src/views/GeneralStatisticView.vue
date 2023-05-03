<template>
    <div :class="{darkContainer: darkMode, lightContainer: lightMode}">
        <div class="wrapper">
            <div class="column">
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Всего заданий</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{allTasks}}</p>
                </div>
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Заданий в обработке</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{ proccessTasks }}</p>
                </div>
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Проблемный кабинет</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{problemCabinet}}</p>
                </div>
            </div>
            <div class="column">
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Принятых Заданий</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{ allowTasks }}</p>
                </div>
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Готовых заданий</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{ readyTasks }}</p>
                </div>
                <div class="item">
                    <p :class="{darkTitle: darkMode, lightTitle: lightMode}">Частый заявитель</p>
                    <p :class="{darkDesc: darkMode, lightDesc: lightMode}">{{ oftenApplicant.name + " " + oftenApplicant.surname  + " " + oftenApplicant.patronymic }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        props: { darkMode: Boolean, lightMode: Boolean },
        data() {
            return {
                tasks: [],
                oftenApplicant: {}
            }
        },
        mounted() {
            axios
            .post(
                "http://localhost:3000/tasks/all",
                { "Access-Control-Allow-Origin": "http://localhost:3000" },
                { withCredentials: true }
            )
            .then((res) => {
                this.tasks = res.data

                let applicants = this.tasks.map(el => el.applicant)
                let result = {};

                for (let i = 0; i < applicants.length; ++i)
                {
                    var a = applicants[i];
                    if (result[a] != undefined)
                        ++result[a];
                    else
                        result[a] = 1;
                }

                let arr = Object.values(result)

                let max = Math.max(...arr)

                let resultApplicant = ''

                for (let key in result){
                    if(result[key] == max){
                        resultApplicant = key
                    }
                }

                axios
                .get("http://localhost:3000/user/" + resultApplicant,
                { withCredentials: true, "Access-Control-Allow-Origin": "http://localhost:3000" })
                .then(res => this.oftenApplicant = res.data)
            });
        },
        computed: {
            allTasks(){
                return this.tasks.reduce((acc, el) => acc + 1, 0)
            },
            readyTasks(){
                return this.tasks.reduce((acc, el) => el.status == 3 ? acc + 1 : acc, 0)
            },
            proccessTasks(){
                return this.tasks.reduce((acc, el) => el.status == 1 ? acc + 1 : acc, 0)
            },
            allowTasks(){
                return this.tasks.reduce((acc, el) => el.status == 2 ? acc + 1 : acc, 0)
            },
            problemCabinet(){
                let cabinets = this.tasks.map(el => el.cabinet)
                let result = {};

                for (let i = 0; i < cabinets.length; ++i)
                {
                    var a = cabinets[i];
                    if (result[a] != undefined)
                        ++result[a];
                    else
                        result[a] = 1;
                }

                let arr = Object.values(result)

                let max = Math.max(...arr)

                let resultCabinet = ''

                for (let key in result){
                    if(result[key] == max){
                        resultCabinet = key
                    }
                }
                
                return resultCabinet
            }
        }
    }
</script>

<style scoped>
/* dark mode start */
    .darkContainer{
        width: 31.770833vw;
        height: 38vh;
        background: #323232;
        border-radius: 0.78125vw;
        padding: 1.5625vw;
        margin-top: 30px;
    }
    .darkTitle{
        font-size: 1.04166667vw;
        color: white;
    }
    .darkDesc{
        width: 8.75vw;
        padding: 0.833333333vw;
        background: #212121;
        border-radius: 15px; 
        border: none;
        margin-top: 5px;
        color: white;   
    }
/* dark mode end */

/* light mode start */
.lightContainer{
        width: 31.770833vw;
        height: 38vh;
        background: #fff;
        border-radius: 0.78125vw;
        padding: 1.5625vw;
        margin-top: 30px;
    }
    .lightTitle{
        font-size: 1.04166667vw;
        color: black;
    }
    .lightDesc{
        width: 8.75vw;
        padding: 0.833333333vw;
        background: #0DCEDA;
        border-radius: 15px; 
        border: none;
        margin-top: 5px;
        color: black;   
    }
/* light mode end */
    .wrapper{
        display: flex;
        justify-content: space-between;  
    }
    .column{
        display: flex;
        flex-direction: column;
        gap: 1.38888889vh;
    }
</style>