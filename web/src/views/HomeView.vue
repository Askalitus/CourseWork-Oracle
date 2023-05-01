<template> 
  <div class="container" @mousemove="movePupil">
    <div :class="{darkEye: darkMode, lightEye: lightMode}" :style="{ transform: rotate1 }" id="eye1" @click="month">
      <div class="eyelidsOpen" :class="{ darkEyelidsClose: eyelidsClose }"></div>
      <div :class="{darkPupil: darkMode, lightPupil: lightMode}"></div>
    </div>
    <div class="center">
      <div :class="{darkForm: darkMode, lightForm: lightMode}">
        <h1 :class="{darkForm_title: darkMode, lightForm_title: lightMode}">Добро пожаловать!</h1>
        <p :class="{darkForm__text: darkMode, lightForm__text: lightMode}">Пожалуйста, войдите в свой рабочий аккаунт.</p>
        <div class="inputs">
          <input type="text" :class="{darkText_input: darkMode, lightText_input: lightMode}" placeholder="Ваш логин" v-model="username">
          <input type="password" :class="{darkText_input: darkMode, lightText_input: lightMode}" placeholder="Ваш пароль" v-model="password">
          <div class="text_error" v-if="error">
            <p>Введен неправильный логиин или пароль!</p>
          </div>
        </div>
        <button :class="{darkBtn: darkMode, lightBtn: lightMode}" @click="login">Войти</button>
      </div>
      <div :class="{monthO: monthO, darkMonthNormal: darkMode, lightMonthNormal: lightMode}"></div>
    </div>
    <div :class="{darkEye: darkMode, lightEye: lightMode}" :style="{ transform: rotate2 }" id="eye2"  @click="month">
      <div class="eyelidsOpen" :class="{ darkEyelidsClose: eyelidsClose }"></div>
      <div :class="{darkPupil: darkMode, lightPupil: lightMode}"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      eye1X: 0,
      eye1Y:0,
      eye2X:0,
      eye2Y:0,
      eyeMidWidth:0,
      eyelidsClose: false,
      monthO: false,
      username: '',
      password: '',
      error: false
    }
  },
  props: { x: Number, y: Number, darkMode: Boolean, lightMode: Boolean },
  methods: {
    month(){
      this.monthO = !this.monthO
      let timer = setTimeout(()=> {
        this.monthO = !this.monthO
      }, 1500)
    },
    login(){
      if(this.username.trim() != '' && this.password.trim() != ''){
        this.error = false
      axios
        .post('http://localhost:3000/login', {
          username: this.username.trim(),
          password: this.password.trim(),
          "Access-Control-Allow-Origin": "http://localhost:3000/login"
        }, {withCredentials: true})
        .then(response => {
          this.userData = response.data
          localStorage.user = JSON.stringify(response.data)
          this.$router.push('/profile')})
        .catch(error => this.error = true)
        }else{
        this.error = true
        }
    }
  },
  computed: {
    rotate1(){
      if(this.x - this.eye1X - this.eyeMidWidth > 0 && this.y - this.eye1Y - this.eyeMidWidth > 0){
        return `rotate(${57.2958*(Math.PI / 2 - Math.atan((this.x - this.eye1X - this.eyeMidWidth) / (this.y - this.eye1Y - this.eyeMidWidth)))}deg)`;
      }
      if(this.x - this.eye1X - this.eyeMidWidth < 0 && this.y - this.eye1Y - this.eyeMidWidth > 0){
        return `rotate(${57.2958*(Math.PI / 2 - Math.atan((this.x - this.eye1X - this.eyeMidWidth) / (this.y - this.eye1Y - this.eyeMidWidth)))}deg)`;
      }
      if(this.x - this.eye1X - this.eyeMidWidth < 0 && this.y - this.eye1Y - this.eyeMidWidth < 0){
        return `rotate(${57.2958*(Math.PI + Math.atan((this.y - this.eye1Y - this.eyeMidWidth) / (this.x - this.eye1X - this.eyeMidWidth)))}deg)`;
      }
      if(this.x - this.eye1X - this.eyeMidWidth > 0 && this.y - this.eye1Y - this.eyeMidWidth < 0){
        return `rotate(${57.2958 * (3 * Math.PI / 2 + Math.abs(Math.atan((this.x - this.eye1X - this.eyeMidWidth) / (this.y - this.eye1Y - this.eyeMidWidth))))}deg)`;
      }
    },
    rotate2(){
      if(this.x - this.eye2X - this.eyeMidWidth > 0 && this.y - this.eye2Y - this.eyeMidWidth > 0){
        return `rotate(${57.2958*(Math.PI / 2 - Math.atan((this.x - this.eye2X - this.eyeMidWidth) / (this.y - this.eye2Y - this.eyeMidWidth)))}deg)`;
      }
      if(this.x - this.eye2X - this.eyeMidWidth < 0 && this.y - this.eye2Y - this.eyeMidWidth > 0){
        return `rotate(${57.2958*(Math.PI / 2 - Math.atan((this.x - this.eye2X - this.eyeMidWidth) / (this.y - this.eye2Y - this.eyeMidWidth)))}deg)`;
      }
      if(this.x - this.eye2X - this.eyeMidWidth < 0 && this.y - this.eye2Y - this.eyeMidWidth < 0){
        return `rotate(${57.2958*(Math.PI + Math.atan((this.y - this.eye2Y - this.eyeMidWidth) / (this.x - this.eye2X - this.eyeMidWidth)))}deg)`;
      }
      if(this.x - this.eye2X - this.eyeMidWidth > 0 && this.y - this.eye2Y - this.eyeMidWidth < 0){
        return `rotate(${57.2958 * (3 * Math.PI / 2 + Math.abs(Math.atan((this.x - this.eye2X - this.eyeMidWidth) / (this.y - this.eye2Y - this.eyeMidWidth))))}deg)`;
      }
    }
  },
  mounted(){
      let eye = document.getElementById('eye1');
      let eye2 = document.getElementById('eye2');
      this.eye1X = eye.getBoundingClientRect().left;
      this.eye1Y = eye.getBoundingClientRect().top;
      this.eye2X = eye2.getBoundingClientRect().left;
      this.eye2Y = eye2.getBoundingClientRect().top;
      this.eyeMidWidth = eye.clientWidth/2

      let timer = setInterval(() => {
        this.eyelidsClose = !this.eyelidsClose
        let timer2 = setTimeout(()=>{
          this.eyelidsClose = !this.eyelidsClose
        }, 100)
      }, 3000)
  }
}
</script>

<style scoped>
/* dark mode start */
.darkForm{
    background: #323232;
    border-radius: 0.78125vw;
    padding: 3.703703703704vh 4.375vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .darkForm_title{
    color: rgba(20, 255, 236, 1);
    font-weight: 500;
    font-size: 2.08333333vw;
    margin-bottom: 0.9259259259259vh;
  }
  .darkForm__text{
    font-weight: 400;
    font-size: 0.833333333vw;
    color: white;
    margin-bottom: 3.703703703704vh;
  }
  .darkText_input{
    width: 22.7604167vw;
    height: 4.62962963vh;
    background: #212121;
    border: none;
    border-radius: 0.78125vw;
    padding-left: 0.8333333333333vw;
    color: white;
    font-size: 0.833333333vw;
  }
  .darkBtn{
    width: 7.8125vw;
    height: 4.62962962963vh;
    background: #212121;
    box-shadow: inset 0px 6px 10px rgba(63, 63, 63, 0.5), inset 0px -3px 10px rgba(0, 0, 0, 0.5);
    border-radius: 0.78125vw;
    border: none;
    color: white;
    font-size: 0.8333333333333vw;
    cursor: pointer;
  }
  .darkBtn:hover{
    color: rgba(20, 255, 236, 1);
  }
  .darkBtn:active{
    box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5), inset 0px -5px 12px rgba(0, 0, 0, 0.5);
  }
  .darkEye{
    position: relative;
    background: #0D7377;
    border: 2px solid #14FFEC;
    box-shadow: inset 0px 24px 15px #128D92, inset 0px -19px 6px #0C6669;
    width: 10vw;
    height: 10vw;
    border-radius: 100%;
    float: left;
    cursor: pointer;
  }
  .darkPupil{
    position: absolute;
    right: 0;
    bottom: 47.79%;
    background: #14FFEC;
    box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.25), inset 0px 5px 4px rgba(255, 255, 255, 0.25), inset 0px -5px 6px rgba(0, 0, 0, 0.25);
    width: 2.239583333333vw;
    height: 2.239583333333vw;
    border-radius: 100%;
    z-index: -1;
  }
  .darkEyelidsClose{
    transition: 0.1s;
    box-shadow: inset #14FFEC 0px 100px 0px 0px, inset #14FFEC 0px -100px 0px 0px;
    z-index: 1;
  }
  .darkMonthNormal{
    background: #0D7377;
    width: 9.479166666667vw;
    height: 8.425925925926vh;
    border-radius: 0px 0px 100% 100%;
    transition: 0.1s;
    border: 2px solid #14FFEC;
  }
/* dark mode end */

/* light mode start */
.lightForm{
    background: #fff;
    border-radius: 0.78125vw;
    padding: 3.703703703704vh 4.375vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .lightForm_title{
    color: black;
    font-weight: 500;
    font-size: 2.08333333vw;
    margin-bottom: 0.9259259259259vh;
  }
  .lightForm__text{
    font-weight: 400;
    font-size: 0.833333333vw;
    color: black;
    margin-bottom: 3.703703703704vh;
  }
  .lightText_input{
    width: 22.7604167vw;
    height: 4.62962963vh;
    background: #0DCEDA;
    border: none;
    border-radius: 0.78125vw;
    padding-left: 0.8333333333333vw;
    color: black;
    font-size: 0.833333333vw;
  }
  .lightText_input::placeholder{
    color: black;
  }
  .lightBtn{
    width: 7.8125vw;
    height: 4.62962962963vh;
    background: #0DCEDA;
    box-shadow: inset 0px 6px 10px #69F6FF, inset 0px -3px 10px #119DA6;
    border-radius: 0.78125vw;
    border: none;
    color: white;
    font-size: 0.8333333333333vw;
    cursor: pointer;
  }
  .lightBtn:hover{
    color: black;
  }
  .lightBtn:active{
    box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5), inset 0px -5px 12px rgba(0, 0, 0, 0.5);
  }
  .lightEye{
    position: relative;
    background: #fff;
    border: 2px solid #000;
    box-shadow: inset 0px 24px 15px #f5f5f5, inset 0px -19px 15px #f1f1f1;
    width: 10vw;
    height: 10vw;
    border-radius: 100%;
    float: left;
    cursor: pointer;
  }
  .lightPupil{
    position: absolute;
    right: 0;
    bottom: 47.79%;
    background: #000;
    box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.25), inset 0px 5px 4px rgba(20, 20, 20, 0.25), inset 0px -5px 6px rgba(0, 0, 0, 0.25);
    width: 2.239583333333vw;
    height: 2.239583333333vw;
    border-radius: 100%;
    z-index: -1;
  }
  .lightEyelidsClose{
    transition: 0.1s;
    box-shadow: inset #14FFEC 0px 100px 0px 0px, inset #14FFEC 0px -100px 0px 0px;
    z-index: 1;
  }
  .lightMonthNormal{
    background: #fff;
    width: 9.479166666667vw;
    height: 8.425925925926vh;
    border-radius: 0px 0px 100% 100%;
    transition: 0.1s;
    border: 2px solid #000;
  }
/* light mode end */
  
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
  }

  .inputs{
    display: flex;
    flex-direction: column;
    gap: 0.9259259259259vh;
    margin-bottom: 3.703703703704vh;
  }
  input::placeholder{
    font-size: 0.833333333vw;
  }
  .eyelidsOpen{
    width: 10vw;
    height: 10vw;
    content: '';
    border-radius: 100%;
    z-index: 1;
    transition: 0.1s;
  }
  .monthO{
    border-radius: 100%;
    transition: 0.1s;
    width: 4.739583333333vw;
  }
  .center{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 4.166666666667vw;
    gap: 7.407407407407vh;
  }
  .text_error{
    background-color: rgba(106, 8, 8, 1);
    border-radius: 0.78125vw;
    padding: 0.8333333333333vw;
    color: white;
    font-size: 0.833333333vw;
  }
</style>
