<template>
  <div class="containerPopup">
    <div class="user" v-if="role == 'user'">
        <div class="inputs">
            <input type="text" placeholder="Описание проблемы (Что случилось)" v-model="problem">
            <input type="text" placeholder="Кабинет" v-model="cabinet">
            <div class="error"  v-if="error">
                <p>{{ error }}</p>
            </div>
        </div>
        <div class="buttons">
            <button v-if="action=='userCreate'" @click="createTask">Создать</button>
            <button v-if="action=='userUpdate'" @click="updateTask">Изменить</button>
            <button v-if="action=='userUpdate'" @click="deleteTask">Удалить</button>
            <button @click="closePopup">Закрыть</button>
        </div>
    </div>

    <div class="worker" v-if="role == 'worker'">
        <div class="inputs">
            <div class="item">
                <p class="title">Описание</p>
                <div class="desc">
                    <p>{{ task.problem }}</p>
                </div>
            </div>
            <div class="item">
                <p class="title">Кабинет</p>
                <div class="desc">
                    <p>{{ task.cabinet }}</p>
                </div>
            </div>
            <div class="item">
                <p class="title">Заявитель</p>
                <div class="desc">
                    <p>{{ applicant.surname + ' ' + applicant.name + ' ' + applicant.patronymic }}</p>
                </div>
            </div>
            <div class="item">
                <p class="title">Дата</p>
                <div class="desc">
                    <p>{{ new Date(task.startDate).toLocaleDateString() }}</p>
                </div>
            </div>
            <div class="item">
                <p class="title">Комментарий</p>
                <div class="desc comment">
                    <p>{{ task.comment }}</p>
                </div>
            </div>
            <div class="error"  v-if="error">
                <p>{{ error }}</p>
            </div>
        </div>
        <div class="buttons">
            <button v-if="task.status == 2">Отметить выполненным</button>
            <button v-if="task.status == 3">Убрать выполнение</button>
            <button @click="closePopup">Закрыть</button>
        </div>
    </div>

    <div class="admin" v-if="role == 'admin'">
        <div class="inputs">
            <div class="item">
                <p class="title">Описание</p>
                <div class="desc">
                    <p>{{ task.problem }}</p>
                </div>
            </div>
            <div class="item">
                <p class="title">Кабинет</p>
                <div class="desc">
                    <p>{{ task.cabinet }}</p>
                </div>
            </div>
            <div class="item">
                <p class="title">Заявитель</p>
                <div class="desc">
                    <p>{{ applicant.surname + ' ' + applicant.name + ' ' + applicant.patronymic }}</p>
                </div>
            </div>
            <div class="item">
                <p class="title">Ответственный</p>
                <select class="select">
                    <option selected disabled style='display: none' v-if="!task.worker">Выбрать ответственного</option>
                    <option selected v-if="task.worker">{{ this.worker }}</option>
                    <option v-for="worker in workerList" :key="worker" @change="getWorker(worker)">
                        {{ worker }}
                    </option>
                </select>
            </div>
            <div class="item">
                <p class="title">Дата</p>
                <div class="desc">
                    <p>{{ new Date(task.startDate).toLocaleDateString() }}</p>
                </div>
            </div>
            <div class="item">
                <p class="title">Комментарий</p>
                <textarea cols="30" rows="4" placeholder="Комментарий" v-model="task.comment"></textarea>
            </div>
            <div class="error" v-if="error">
                <p>{{ error }}</p>
            </div>
        </div>
        <div class="buttons">
            <button v-if="!task.worker">Подтвердить задание</button>
            <button v-if="task.worker">Изменить</button>
            <button @click="closePopup">Закрыть</button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        action: String,

        task: {
        id: Number,
        problem: String,
        applicant: Number,
        cabinet: String,
        description: Number,
        worker: Number,
        status: Number,
        startDate: Date,
        endDate: Date,
        comment: String
    }},
    data(){
        return{
            role: '',
            applicant: {},
            workers: [],
            selected_worker: null,
            worker:'',
            error: '',

            problem: '',
            cabinet: '',
        }
    },
    computed:{
        workerList(){
            return this.workers.map(e => e.id + ' ' + e.surname + ' ' + e.name + ' ' + e.patronymic)
        }
    },
    mounted(){
        this.problem = this.task.problem
        this.cabinet = this.task.cabinet

        if(this.task.worker){
            this.selected_worker = this.worker
        }
        axios
        .post('http://localhost:3000/user/role', {}, {withCredentials: true})
        .then(res => {
            this.role = res.data
            if(this.role == 'admin' || this.role == 'worker'){
            axios
            .get('http://localhost:3000/user/' + String(this.task.applicant), {withCredentials: true})
            .then(res => this.applicant = res.data)
            }
            if(this.role == 'admin'){
            axios
            .get('http://localhost:3000/user', {withCredentials: true})
            .then(res => {
                if(!this.task.worker){
                    this.workers = res.data.filter(us => us.role == 2)
                }else{
                    this.workers = res.data.filter( us => us.role == 2)
                    let wrk = this.workers.filter( us => us.id == this.task.worker)
                    this.worker = wrk[0].id + ' ' + wrk[0].surname + ' ' + wrk[0].name + ' ' + wrk[0].patronymic
                    this.workers = this.workers.filter( us => us.id != this.task.worker)
                }
                })
            }
        })
    },
    methods:{
        closePopup(){
            this.problem = ''
            this.cabinet = ''
            this.$emit('closePopup')
        },
        getWorker(e){
            this.selected_worker = Number(e.split(' ')[0])
        },
        createTask(){
            if(!this.problem.trim()){
                this.error = 'Опишите проблему!'
            } else if(!this.cabinet.trim() || this.cabinet.length > 4 || this.cabinet.length < 3){
                this.error = 'Введите корректный кабинет!'
            }else{
            axios
                .post('http://localhost:3000/task-desc', {
                    problem: this.problem,
                    cabinet: this.cabinet,
                }, { withCredentials: true })
                .then(res => {
                    let taskDesk = res.data.id
                    axios
                    .post('http://localhost:3000/tasks', {
                    description: taskDesk,
                    status: 1
                }, { withCredentials: true })
                this.$emit('closePopup', true)
                })
            }
        },
        updateTask(){
            axios
                .patch('http://localhost:3000/task-desc', {
                    problem: this.problem,
                    cabinet: this.cabinet,
                }, { withCredentials: true })
            this.$emit('closePopup', true)
        }
    }
}
</script>

<style scoped>
    .containerPopup{
        background: #212121;
        border: #323232 6px solid;
        border-radius: 0.78125vw;
        padding: 2.31481481vh 1.30208333vw;
    }

    .user{
        display: flex;
        flex-direction: column;
    }

    .inputs{
        display: flex;
        flex-direction: column;
        gap: 1.85185185vh;
    }

    input{
        background: #323232;
        border: none;
        border-radius: 0.78125vw;
        color: white;
        font-size: 0.833333333vw;
        width: 26.0416667vw;
        height: 4.62962963vh;
        padding-left: 0.833333333vw;
    }

    input::placeholder{
        font-size: 0.833333333vw;
    }

    textarea{
        background: #323232;
        border: none;
        border-radius: 0.78125vw;
        color: white;
        font-size: 0.833333333vw;
        width: 25.20833337vw;
        height: 9.25925926vh;
        padding: 1.48148148vh 0.833333333vw;
        resize: none;
        margin-top: 0.462962963vh;
    }

    .buttons{
        display: flex;
        justify-content: space-between;
        margin-top: 2.77777778vh;
    }

    button{
        padding: 1.38888889vh 1.82291667vw;
        background: #212121;
        box-shadow: inset 0px 6px 10px rgba(63, 63, 63, 0.5), inset 0px -3px 10px rgba(0, 0, 0, 0.5);
        border-radius: 0.78125vw;
        border: none;
        color: white;
        font-size: 0.8333333333333vw;
        cursor: pointer;
    }

    button:hover{
        color: rgba(20, 255, 236, 1);
    }

    button:active{
        box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5), inset 0px -5px 12px rgba(0, 0, 0, 0.5);
    }

    .title{
        font-size: 1.04166667vw;
        color: white;
    }

    .desc{
        background: #323232;
        border: none;
        border-radius: 0.78125vw;
        color: white;
        font-size: 0.833333333vw;
        width: 26.0416667vw;
        padding: 1.48148148vh 0 1.48148148vh 0.833333333vw;
        margin-top: 0.462962963vh;
    }
    .comment{
        height: 9.25925926vh;
    }

    .select{
        background: #323232;
        border: none;
        border-radius: 0.78125vw;
        color: white;
        font-size: 0.833333333vw;
        width: 26.8749997vw;
        padding: 1.48148148vh 0 1.48148148vh 0.833333333vw;
        margin-top: 0.462962963vh;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        overflow: hidden;
    }

    .select::-ms-expand{
        display: none;
    }

    .select::after{
        content: '\258C';
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 1em;
    }

    .comment::placeholder{
        position: absolute;
        top: 1.48148148vh;
        word-wrap: normal;
    }

    .error{
        width: 26.0416667vw;
        padding: 1.48148148vh 0 1.48148148vh 0.833333333vw;
        background: rgba(106, 8, 8, 1);
        border: none;
        border-radius: 0.78125vw;
        color: white;
        font-size: 0.833333333vw;
        margin-top: 0.462962963vh;
    }
</style>