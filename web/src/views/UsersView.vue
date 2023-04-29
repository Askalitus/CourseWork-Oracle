<template>
    <div class="users__container">
        <CreateUser v-if="createUser" />
        <users v-if="!createUser" />
    </div>
</template>

<script>
    import CreateUser from '../components/CreateUser.vue';
import Users from '../components/Users.vue';
    export default {
        components: {CreateUser, Users},
        data(){
            return{
                createUser: false
            }
        }
    }
</script>

<style scoped>
    .users__container{
        width: 32.1875vw;
    }
</style>