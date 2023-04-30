<template>
    <div>
        <div class="top">
            <div class="admin__bar">
                <p>Статистика:</p>
                <router-link  class="clickable" to="/statistic">Общая</router-link>
                <router-link  class="clickable" to="/workers">По работникам</router-link>
            </div>
            <button @click="toTask">Задания</button>
        </div>
        <router-view />
    </div>
</template>

<script>
    export default {
        methods:{
        toTask(){
            this.$emit('toTask')
        }
        }
    }
</script>

<style scoped>
.admin__bar{
    background-color: #323232;
    padding: 1.57407407vh 0.885416667vw;
    display: flex;
    gap: 1.04166667vw;
    border-radius: 0.78125vw;
}

p{
  color: white;
  font-size: 0.78125vw;
  font-weight: 700;
}

.clickable{
    font-size: 0.729166667vw;
    font-weight: 500;
    color: white;
    text-decoration: none;
}
.clickable:hover{
    color: #14FFEC;
    cursor: pointer;
}

button {
  padding: 1.38888889vh 1.82291667vw;
  background: #212121;
  box-shadow: inset 0px 6px 10px rgba(63, 63, 63, 0.5),
    inset 0px -3px 10px rgba(0, 0, 0, 0.5);
  border-radius: 0.78125vw;
  border: none;
  color: white;
  font-size: 0.8333333333333vw;
  cursor: pointer;
}

button:hover {
  color: rgba(20, 255, 236, 1);
}

button:active {
  box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5),
    inset 0px -5px 12px rgba(0, 0, 0, 0.5);
}

.top{
    width: 34.8958333vw;
    display: flex;
    align-items: end;
    justify-content: space-between;
}
</style>