import {
    createStore
} from 'vuex'
import axios from 'axios'
import router from '../router'

export default createStore({
    state: {
        articles: [],
        showAddForm: false,
        modalUpdate: false,
        title: '',
        description: '',
        price: '',
        update: {},
        image_url: '',
        email: '',
        password: '',
    },
    mutations: {},
    actions: {
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
        },
        getDatas() {
            axios.get('http://localhost:3000/api/stuff')
                .then(res => this.articles = res.data)
                .catch(error => console.log(error));
        },
        createArticle(e) {
            e.preventDefault(); // empeche le refresh de la page
            let formulaire = {};

            formulaire.title = this.title
            formulaire.description = this.description
            formulaire.price = this.price
            formulaire.image_url = this.image_url

            axios.post('http://localhost:3000/api/stuff', {
                formulaire
            }).then((res) => {
                console.log(res)
                e.target.reset()
            }).catch(error => console.log(error));

            setTimeout(function () {
                location.reload();
            }, 500);
        },
        updateOne(post) {
            event.preventDefault();
            console.log('this.updateOne')
            axios.put('http://localhost:3000/api/stuff/' + post._id, {
                data: post
            });
            setTimeout(function () {
                location.reload();
            }, 500);
        },
        deleteOne(post) {
            axios.delete('http://localhost:3000/api/stuff/' + post._id);
            setTimeout(function () {
                location.reload();
            }, 500);
        },
        callAddForm() {
            if (this.showAddForm == true) {
                this.showAddForm = false
            } else {
                this.showAddForm = true
            }
        },
        setModalUpdate(post) {
            this.modalUpdate = true
            this.update = post
            // this.updateOne(this.update)
        },
    },
    modules: {}
})