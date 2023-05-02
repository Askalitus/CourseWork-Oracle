<template>
  <div :class="{darkPanel: darkMode, lightPanel: lightMode}">
    <p :class="{darkP: darkMode, lightP: lightMode}">Сортировка:</p>
    <p :class="{darkClickable: darkMode, lightClickable: lightMode}" @click="sortAll()">Все</p>
    <p :class="{darkClickable: darkMode, lightClickable: lightMode}" @click="sortNew()">Новые</p>
    <p :class="{darkClickable: darkMode, lightClickable: lightMode}" @click="sortOld()">Старые</p>
    <p :class="{darkClickable: darkMode, lightClickable: lightMode}" @click="sortProcess()">В обработке</p>
    <p :class="{darkClickable: darkMode, lightClickable: lightMode}" @click="sortAllow()">Принятые</p>
    <p :class="{darkClickable: darkMode, lightClickable: lightMode}" @click="sortReady()">Готовые</p>
  </div>
</template>

<script>
export default {
    props: {darkMode: Boolean, lightMode: Boolean},
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
/* dark mode start */
.darkPanel{
    background-color: #323232;
    padding: 1.57407407vh 0.885416667vw;
    display: flex;
    gap: 1.04166667vw;
    border-radius: 0.78125vw;
}
.darkP{
    font-size: 0.78125vw;
    font-weight: 700;
    color: white;
}
.darkClickable:hover{
    color: #14FFEC;
    cursor: pointer;
}
.darkClickable{
    font-size: 0.729166667vw;
    font-weight: 500;
    color: white;
}
/* dark mode end */

/* light mode start */
.lightPanel{
    background-color: #fff;
    padding: 1.57407407vh 0.885416667vw;
    display: flex;
    gap: 1.04166667vw;
    border-radius: 0.78125vw;
}
.lightP{
    font-size: 0.78125vw;
    font-weight: 700;
    color: black;
}
.lightClickable:hover{
    color: #119DA6;
    cursor: pointer;
}
.lightClickable{
    font-size: 0.729166667vw;
    font-weight: 500;
    color: black;
}
/* light mode end */

</style>