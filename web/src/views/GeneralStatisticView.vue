<template>
    <div class="container">
        <div class="wrapper">
            <div class="column">
                <div class="item">
                    <p class="title">Всего заданий</p>
                    <p class="desc">{{allTasks}}</p>
                </div>
                <div class="item">
                    <p class="title">Заданий в обработке</p>
                    <p class="desc">{{ proccessTasks }}</p>
                </div>
                <div class="item">
                    <p class="title">Проблемный кабинет</p>
                    <p class="desc">{{problemCabinet}}</p>
                </div>
            </div>
            <div class="column">
                <div class="item">
                    <p class="title">Принятых Заданий</p>
                    <p class="desc">{{ allowTasks }}</p>
                </div>
                <div class="item">
                    <p class="title">Готовых заданий</p>
                    <p class="desc">{{ readyTasks }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
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
    .container{
        width: 31.770833vw;
        height: 38vh;
        background: #323232;
        border-radius: 0.78125vw;
        padding: 1.5625vw;
        margin-top: 30px;
    }
    .wrapper{
        display: flex;
        justify-content: space-between;  
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
    .desc{
        width: 8.75vw;
        padding: 0.833333333vw;
        background: #212121;
        border-radius: 15px; 
        border: none;
        margin-top: 5px;
        color: white;   
    }
</style>