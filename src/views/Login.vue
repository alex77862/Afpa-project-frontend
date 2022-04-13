<template>
    <div class="home">
        <Navbar />
        <div class="marginTop100">
            <form class="login-form flex flexColumn" @submit="signup">
                <input v-model="email" class="borderRadius5 borderNone" type="text" placeholder="username" />
                <input v-model="password" class="borderRadius5 borderNone" type="password" placeholder="password" />
                <button class="borderRadius5 borderNone">Inscription</button>
            </form>
            <router-link class="borderRadius5 bold" to="/Admin">Connexion</router-link>
        </div>

        <div class="marginTop100">
            <form class="login-form flex flexColumn" @submit="login">
                <input v-model="email" class="borderRadius5 borderNone" type="text" placeholder="username" />
                <input v-model="password" class="borderRadius5 borderNone" type="password" placeholder="password" />
                <button class="borderRadius5 borderNone">Connexion</button>
            </form>
        </div>

    </div>
</template>


<script>
    import Navbar from '@/components/Navbar.vue'
    import axios from 'axios'
    import router from '../router'

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            signup() {
                let loginForm = {
                    email: this.email,
                    password: this.password
                }

                axios.post('http://localhost:3000/api/auth/signin', loginForm)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((error) => {
                        console.log(error)
                        alert('error')
                    })
            },
            login(e) {
                e.preventDefault()
                let loginForm = {
                    email: this.email,
                    password: this.password
                }

                axios.post('http://localhost:3000/api/auth/login', loginForm)
                    .then((res) => {
                        console.log(res)
                        router.push('/admin')
                    })
                    .catch((error) => {
                        console.log(error)
                        alert('Identifiants incorrect')
                    })
            }
        },
        components: {
            Navbar
        }
    }
</script>

<style scoped>
    .login-form>input {
        margin: 5px auto;
        padding: 5px;
        height: 30px;
    }

    .login-form>button {
        margin: 5px auto;
        padding: 2px 20px;
        height: 30px;
    }
</style>