<template>
    <div class="panel">
        <p>Действие:</p>
        <p class="clickable" @click="sortAll()">Пользователи</p>
        <p class="clickable" @click="sortNew()">Статистика</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.panel{
    width: 33.125vw;
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

</style>