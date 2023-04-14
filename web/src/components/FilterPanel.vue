<template>
  <div class="panel">
    <p>Сортировка:</p>
    <p class="clickable" @click="sortAll()">Все</p>
    <p class="clickable" @click="sortNew()">Новые</p>
    <p class="clickable" @click="sortOld()">Старые</p>
    <p class="clickable" @click="sortProcess()">В обработке</p>
    <p class="clickable" @click="sortAllow()">Принятые</p>
    <p class="clickable" @click="sortReady()">Готовые</p>
  </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    methods:{
        sortAll(){
            this.$emit('sortAll', 0)
        },
        sortNew(){
            this.$emit('sortNew')
        },
        sortOld(){
            this.$emit('sortOld')
        },
        sortProcess(){
            this.$emit('sortProccess', 1)
        },
        sortAllow(){
            this.$emit('sortAllow', 2)
        },
        sortReady(){
            this.$emit('sortReady', 3)
        },
    }
}
</script>

<style scoped>
.panel{
    background-color: #323232;
    padding: 1.57407407vh 0.885416667vw;
    display: flex;
    gap: 1.04166667vw;
    border-radius: 0.78125vw;
}
p{
    font-size: 0.78125vw;
    font-weight: 700;
    color: white;
}
.clickable{
    font-size: 0.729166667vw;
    font-weight: 500;
}
.clickable:hover{
    color: #14FFEC;
    cursor: pointer;
}
.selected{
        color: #14FFEC;
    }
</style>