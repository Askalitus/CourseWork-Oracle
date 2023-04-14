<script>

  export default{
    data(){
      return{
        x: 0,
        y: 0
      }
    },
    methods: {
      mousemove(event){
        this.x = event.x
        this.y = event.y
      }
    }
  }
</script>

<template>
  <div class="container" @mousemove="mousemove">
    <header>
      <img src="./assets/Oracul_logo.png" class="logo">
    </header>
    <RouterView :x="x" :y="y"/>
  </div>
</template>

<style>
  *{
    margin: 0;
    padding: 0;
    font-family: 'Comfortaa', cursive;
  }
  body{
    background: #212121;
  }
  .container{
    height: 90vh;
  }
  header{
    width: 100%;
    background: #323232;
    display: flex;
    justify-content: center;
    padding: 2.777777777778vh 0;
  }
  .logo{
    width: 11.7708333vw;
  }
</style>
