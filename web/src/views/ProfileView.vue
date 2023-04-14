<template>
  <div class="container">
    <div class="viniet" v-if="popup">
        <Popup :action="action" @closePopup="closePopup($event)" :task="task" />
    </div>
    <div class="wrapper">
        <div class="profile_card">
            <ProfileCard />
        </div>
        <div class="right_side">
            <div class="filter">
                <FilterPanel @sortAll="sortAll($event)" @sortNew="sortNew()" @sortOld="sortOld()" @sortProccess="sortProccess($event)" @sortAllow="sortAllow($event)" @sortReady="sortReady($event)" />
            </div>
            <div class="button_panel">
                <p class="filter_text">{{ filterText }}</p>
                <button v-if="role=='user'" @click="createTaskPopup">Создать задачу</button>
                <button v-if="role=='admin'">Админ панель</button>
            </div>
            <div class="task_list">
                <div class="task" v-for="task in taskList" :key="task.id">
                <Task :task="task" :role="role" @updateTaskPopup="updateTaskPopup($event)" @workerPopup="workerPopup($event)" @adminPopup="adminPopup($event)" />
            </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ProfileCard from '../components/ProfileCard.vue';
import FilterPanel from '../components/FilterPanel.vue'
import Task from '../components/Task.vue'
import Popup from '../components/Popup.vue'
import axios from 'axios'
export default {
    components: {ProfileCard, FilterPanel, Task, Popup},
    data(){
        return{
            role: '',
            tasks: [],
            filterText: 'Все задачи',
            status: 0,
            popup: false,
            action: '',
            task: {}
        }
    },
    mounted(){
        axios
        .post('http://localhost:3000/user/role', {}, {withCredentials: true})
        .then(res => {
            this.role = res.data
            if(this.role == 'worker'){
            axios
                .post('http://localhost:3000/tasks/worker', {}, {withCredentials: true})
                .then(res => this.tasks = res.data)
                }
            if(this.role == 'user'){
                axios
                .post('http://localhost:3000/tasks/user', {}, {withCredentials: true})
                .then(res => {this.tasks = res.data})
            }else{
                axios
                .get('http://localhost:3000/tasks', {withCredentials: true})
                .then(res => {this.tasks = res.data
                })
            }
        })
    },
    computed: {
        taskList(){
            if(this.status != 0){
                return this.tasks.filter(task => task.status == this.status)
            }
            return this.tasks
        }
    },
    methods:{
        sortNew(){
            return this.tasks.sort((a, b) => {
                return new Date(b.startDate) -  new Date(a.startDate)
            })
        },
        sortOld(){
            return this.tasks.sort((a, b) => {
                return new Date(a.startDate) - new Date(b.startDate)
            })
        },
        sortAll(event){
            this.filterText = "Все задачи"
            this.status = event
        },
        sortProccess(event){
            this.filterText = "В обработке"
            this.status = event
        },
        sortAllow(event){
            this.filterText = "Принятые"
            this.status = event
        },
        sortReady(event){
            this.filterText = "Готовые"
            this.status = event
        },

        createTaskPopup(){
            this.action = 'userCreate'
            this.popup = !this.popup
        },
        updateTaskPopup(e){
            this.task = e
            this.action = 'userUpdate'
            this.popup = !this.popup
        },
        workerPopup(e){
            this.task = e
            this.popup = !this.popup
        },
        adminPopup(e){
            this.task = e
            this.popup = !this.popup
        },
        closePopup(e){
            if(e){
                if(this.role == 'worker'){
            axios
                .post('http://localhost:3000/tasks/worker', {}, {withCredentials: true})
                .then(res => this.tasks = res.data)
                }
            if(this.role == 'user'){
                axios
                .post('http://localhost:3000/tasks/user', {}, {withCredentials: true})
                .then(res => {this.tasks = res.data})
            }else{
                axios
                .get('http://localhost:3000/tasks', {withCredentials: true})
                .then(res => {this.tasks = res.data
                })
            }
            }
            this.action = ''
            this.popup = !this.popup
        }
    }

}
</script>

<style scoped>
    .container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    }
    .viniet{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wrapper{
        display: flex;
        align-items: start;
    }
    .right_side{
        width: 34.8958333vw;
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
    .profile_card{
        margin-right: 6.77083333vw;
    }

    .button_panel{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-top: 2.77777778vh;
        margin-bottom: 1.85185185vh;
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

    .filter_text{
        font-size: 2.08333333vw;
        color: white;
    }

    .task_list{
        display: flex;
        flex-direction: column;
        gap: 1.85185185vh;
    }

</style>
