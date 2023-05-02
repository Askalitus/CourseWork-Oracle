<template>
    <div>
        <div :class="{darkUser: darkMode, lightUser: lightMode}">
            <div class="column">
                <div class="item">
                    <p class="title">Имя:</p>
                    <p class="desc">{{ user.name }}</p>
                </div>
                <div :class="{darkLine: darkMode, lightLine: lightMode}"></div>
                <div class="item">
                    <p class="title">Фамилия:</p>
                    <p class="desc">{{ user.surname }}</p>
                </div>
            </div>
            <div class="column">
                <div class="item">
                    <p class="title">Отчество:</p>
                    <p class="desc">{{ user.patronymic }}</p>
                </div>
                <div :class="{darkLine: darkMode, lightLine: lightMode}"></div>
                <div class="item">
                    <p class="title">Роль:</p>
                    <p class="desc">{{ role }}</p>
                </div>
            </div>
            <div class="column">
                <button :class="{darkButton: darkMode, lightButton: lightMode}" @click="detailUser">
                    <svg width="30" height="24" viewBox="0 0 30 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.46249 10.2337C7.20749 10.2727 7.01849 10.3342 6.81599 10.4407C6.34799 10.6897 6.02399 11.1247 5.89949 11.6677C5.88149 11.7457 5.87549 11.8477 5.87549 12.0247C5.87549 12.2017 5.88149 12.3037 5.89949 12.3817C6.06749 13.1182 6.61199 13.6522 7.34249 13.7962C7.49699 13.8277 7.86599 13.8232 8.02499 13.7887C8.76449 13.6297 9.33149 13.0342 9.44249 12.2992C9.58349 11.3617 8.98199 10.4797 8.05499 10.2682C7.93049 10.2397 7.56449 10.2187 7.46249 10.2337Z"/>
                        <path d="M14.7975 10.2339C14.5455 10.2729 14.3745 10.3269 14.1705 10.4319C13.695 10.6749 13.3515 11.1279 13.236 11.6649C13.215 11.7579 13.209 11.8554 13.209 12.0249C13.209 12.3579 13.257 12.5649 13.407 12.8544C13.65 13.3299 14.103 13.6734 14.64 13.7889C14.817 13.8279 15.183 13.8279 15.36 13.7889C16.0695 13.6359 16.611 13.0929 16.764 12.3849C16.803 12.2079 16.803 11.8419 16.764 11.6649C16.6125 10.9644 16.083 10.4259 15.39 10.2684C15.2655 10.2399 14.8995 10.2189 14.7975 10.2339Z"/>
                        <path d="M22.1325 10.2339C21.8805 10.2729 21.7095 10.3269 21.5055 10.4319C21.003 10.6884 20.6415 11.1924 20.5575 11.7504C20.4135 12.6999 21.03 13.5849 21.975 13.7889C22.134 13.8234 22.503 13.8279 22.6575 13.7964C23.025 13.7244 23.343 13.5549 23.604 13.2939C23.859 13.0389 24.0165 12.7494 24.1005 12.3819C24.135 12.2289 24.135 11.8209 24.1005 11.6679C23.9385 10.9539 23.4195 10.4274 22.725 10.2684C22.6005 10.2399 22.2345 10.2189 22.1325 10.2339Z"/>
                    </svg>
                </button>
                <button :class="{darkButton: darkMode, lightButton: lightMode}" @click="deleteUser">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="836.000000pt" height="980.000000pt" viewBox="0 0 836.000000 980.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)"
                        stroke="none">
                        <path d="M3815 9784 c-387 -59 -687 -165 -938 -331 -96 -64 -252 -222 -300
                        -303 -21 -36 -49 -104 -64 -151 l-26 -86 -405 -6 c-223 -4 -613 -7 -866 -7
                        -254 -1 -530 -5 -615 -10 -154 -9 -155 -9 -240 -51 -128 -63 -228 -168 -304
                        -317 l-57 -111 2 -413 3 -413 4175 0 4175 0 3 413 2 413 -55 107 c-85 166
                        -213 291 -355 346 -66 26 -275 35 -806 36 -253 0 -643 3 -866 7 l-406 6 -22
                        78 c-35 123 -90 211 -199 320 -55 55 -133 121 -183 153 -221 144 -536 258
                        -825 301 -234 34 -665 44 -828 19z"/>
                        <path d="M314 7078 c3 -24 110 -1076 236 -2338 292 -2910 390 -3870 451 -4410
                        24 -211 28 -221 118 -288 l56 -42 2780 1 c2739 0 3218 4 3266 29 40 21 98 82
                        108 114 28 85 101 782 462 4391 137 1375 252 2519 256 2543 l6 42 -3873 0
                        -3872 0 6 -42z m3921 -982 c71 -19 124 -48 172 -95 73 -70 75 -79 86 -341 13
                        -318 13 -3872 0 -4192 -12 -276 -13 -279 -94 -353 -125 -112 -307 -114 -432
                        -4 -86 75 -89 84 -98 318 -15 394 -22 2785 -10 3611 6 437 15 815 20 839 18
                        90 106 173 225 210 74 24 70 24 131 7z m-1982 -24 c72 -26 134 -67 157 -104
                        58 -96 87 -361 265 -2418 113 -1318 175 -2092 175 -2200 0 -127 -59 -223 -172
                        -279 -51 -26 -73 -31 -134 -31 -136 0 -248 61 -282 152 -53 142 -68 297 -313
                        3105 l-132 1522 33 63 c46 87 66 111 117 149 84 59 189 75 286 41z m4092 -16
                        c71 -32 123 -87 163 -171 l33 -69 -46 -535 c-332 -3849 -341 -3937 -397 -4089
                        -34 -91 -146 -152 -281 -152 -177 0 -307 132 -307 310 0 111 65 919 176 2190
                        174 2006 203 2290 239 2376 30 72 118 142 209 165 52 14 154 2 211 -25z"/>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        props: {user: Object, darkMode: Boolean, lightMode: Boolean},
        data(){
            return{
                role: ''
            }
        },  
        mounted(){
            axios
            .get(
                "http://localhost:3000/role/" + this.user.role,
                { withCredentials: true, "Access-Control-Allow-Origin": "http://localhost:3000" }
            )
            .then((res) => {
                this.role = res.data.role_name;
            });
        },
        methods: {
            deleteUser(){
                axios
                    .delete("http://localhost:3000/user/" + this.user.id,
                    { withCredentials: true, "Access-Control-Allow-Origin": "http://localhost:3000" })
                    .then(res => {this.$emit('updateUserList')})
            },
            detailUser(){
                this.$emit('detailUser', this.user)
            }
        }
    }
</script>

<style scoped>
/* dark mode start */
    .darkUser{
        display: flex;
        align-items: center;
        background-color: #323232;
        color: white;
        border-radius: 0.78125vw;
        padding: 2.40740741vh 1.35416667vw;
        justify-content: space-between;
        width: 100%;
    }
    .darkLine{
        height: 1px;
        width: 7vw;
        background-color: white;
    }
    .darkButton{
        width: 2.08333333vw;
        height: 2.08333333vw;
        border-radius: 100%;
        box-shadow: inset 0px 6px 10px rgba(63, 63, 63, 0.5), inset 0px -3px 10px rgba(0, 0, 0, 0.5);
        border: none;
        cursor: pointer;
        background: #212121;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .darkButton:hover path{
        fill: #14FFEC;
    }

    .darkButton:active{
        box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5), inset 0px -5px 12px rgba(0, 0, 0, 0.5);
    }
/* dark mode end */

/* light mode start */
.lightUser{
        display: flex;
        align-items: center;
        background-color: #fff;
        color: black;
        border-radius: 0.78125vw;
        padding: 2.40740741vh 1.35416667vw;
        justify-content: space-between;
        width: 100%;
    }
    .lightLine{
        height: 1px;
        width: 7vw;
        background-color: black;
    }
    .lightButton{
        width: 2.08333333vw;
        height: 2.08333333vw;
        border-radius: 100%;
        box-shadow: inset 0px 6px 10px #69F6FF, inset 0px -3px 10px #119DA6;
        border: none;
        cursor: pointer;
        background: #0DCEDA;
        display: flex;
        justify-content: center;
        align-items: center;
        fill: #fff;
    }

    .lightButton:hover path{
        fill: black;
    }

    .lightButton:active{
        box-shadow: inset 0px 5px 14px rgba(0, 0, 0, 0.5), inset 0px -5px 12px rgba(0, 0, 0, 0.5);
    }
/* light mode end */
    .item{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .column{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .desc{
        font-size: 14px;
        font-weight: 300;
    }
    svg{
        width: 1.04166667vw;
        height: 1.04166667vw;
    }
</style>