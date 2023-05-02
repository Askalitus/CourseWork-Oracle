<template>
    <div>
        <div class="top">
            <div :class="{darkAdmin__bar: darkMode, lightAdmin__bar: lightMode}">
                <p :class="{darkP: darkMode, lightP: lightMode}">Статистика:</p>
                <router-link  :class="{darkClickable: darkMode, lightClickable: lightMode}" to="/statistic">Общая</router-link>
                <router-link  :class="{darkClickable: darkMode, lightClickable: lightMode}" to="/workers">По работникам</router-link>
            </div>
            <button :class="{darkButton: darkMode, lightButton: lightMode}" @click="toTask">Задания</button>
        </div>
        <router-view :darkMode="darkMode" :lightMode="lightMode" />
    </div>
</template>

<script>
    export default {
        props: { darkMode: Boolean, lightMode: Boolean },
        methods:{
        toTask(){
            this.$emit('toTask')
        }
        }
    }
</script>

<style scoped>
/* dark mode start */
.darkAdmin__bar{
    background-color: #323232;
    padding: 1.57407407vh 0.885416667vw;
    display: flex;
    gap: 1.04166667vw;
    border-radius: 0.78125vw;
}

.darkP{
  color: white;
  font-size: 0.78125vw;
  font-weight: 700;
}

.darkClickable{
    font-size: 0.729166667vw;
    font-weight: 500;
    color: white;
    text-decoration: none;
}
.darkClickable:hover{
    color: #14FFEC;
    cursor: pointer;
}

.darkButton {
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

.darkButton:hover {
  color: rgba(20, 255, 236, 1);
}

.darkButton:active {
  box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5),
    inset 0px -5px 12px rgba(0, 0, 0, 0.5);
}

/* dark mode end */

/* dark mode start */
.lightAdmin__bar{
    background-color: #fff;
    padding: 1.57407407vh 0.885416667vw;
    display: flex;
    gap: 1.04166667vw;
    border-radius: 0.78125vw;
}

.lightP{
  color: black;
  font-size: 0.78125vw;
  font-weight: 700;
}

.lightClickable{
    font-size: 0.729166667vw;
    font-weight: 500;
    color: black;
    text-decoration: none;
}
.lightClickable:hover{
    color: #119DA6;
    cursor: pointer;
}

.lightButton {
  padding: 1.38888889vh 1.82291667vw;
  background: #0DCEDA;
    box-shadow: inset 0px 6px 10px #69F6FF, inset 0px -3px 10px #119DA6;
  border-radius: 0.78125vw;
  border: none;
  color: white;
  font-size: 0.8333333333333vw;
  font-weight: 700;
  cursor: pointer;
}

.lightButton:hover {
  color: black;
}

.lightButton:active {
  box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5),
    inset 0px -5px 12px rgba(0, 0, 0, 0.5);
}

/* light mode end */

.top{
    width: 34.8958333vw;
    display: flex;
    align-items: end;
    justify-content: space-between;
}
</style>