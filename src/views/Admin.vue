<template>
    <div>
        <Navbar />
        <h2 class="marginTop100" style="color: white;">Espace Admin</h2>
        <span v-if="articles.length == 0">Aucun article disponible</span>

        <!-- Get all datas -->
        <div class="flex justifyContentCenter flexWrap">
            <div class="item borderRadius5 flex flexColumn justifyContentBetween" v-for="post in articles" :key="post.title">
                <img class="borderRadius5" :src="post.image_url" />
                <div class="descriptionItem flex flexColumn justifyContentEnd">
                    <span class="bold">{{ post.title }}</span>
                    <span>{{ post.description }}</span>
                    <span>{{ post.price }} €</span>
                </div>
                <div class="buyItem flex alignItemsCenter justifyContentAround">
                    <button class="borderRadius5 updateItem" @click="setModalUpdate(post)">Modifier l'article</button>
                    <button class="borderRadius5 deleteItem" @click="deleteOne(post)">Supprimer l'article</button>
                </div>
            </div>
        </div>

        <!-- Add New Item -->
        <div class="width100 marginTop100 paddingBot50">
            <button @click="callAddForm()" class="newArticle borderRadius5">Ajouter un article</button>
        </div>

        <div v-if="showAddForm == true" class="flex justifyContentCenter marginBot50">
            <form @submit="createArticle" class="flex flexColumn">
                <input v-model="title" placeholder="Titre de l'article" required />
                <input v-model="image_url" placeholder="Url de l'image" required />
                <input v-model="description" placeholder="Description de l'article" required />
                <input v-model="price" type="number" placeholder="Prix de l'article" required />
                <button class="btn btn-primary" type="submit">Créer l'article</button>
            </form>
        </div>

        <div v-if="modalUpdate" class="flex justifyContentCenter marginBot50">
            <form @submit="updateOne(update)" class="flex flexColumn">
                <input v-model="update.title" placeholder="Titre de l'article" required />
                <input v-model="update.image_url" placeholder="Url de l'image" required />
                <input v-model="update.description" placeholder="Description de l'article" required />
                <input v-model="update.price" type="number" placeholder="Prix de l'article" required />
                <button class="btn btn-primary" type="submit">Modifier l'article</button>
            </form>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    import axios from 'axios'

    export default {
        name: 'Product',
        data() {
            return {
                articles: [],
                showAddForm: false,
                modalUpdate: false,
                title: '',
                description: '',
                price: '',
                update: {},
                image_url: '',
            }
        },
        methods: {
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
            setModalUpdate(post){
                this.modalUpdate = true
                this.update = post
                // this.updateOne(this.update)
            }
        },
        mounted: function () {
            this.getDatas()
            
        },
        components: {
            Navbar
        }
    }
</script>

<style scoped>
    form {
        width: 25%;
    }

    span,
    h3 {
        color: white;
    }

    .item {
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
        width: 300px;
        height: 400Px;
        margin: 25px;
    }

    .item>img {
        width: 100%;
        height: 60%;
    }

    .item>.descriptionItem {
        height: 15%;
    }

    .item>.buyItem {
        height: 15%;
    }

    .buyItem>button {
        padding: 5px;
        border: 0;
        box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
    }

    .updateItem {
        background: darkgoldenrod;
        color: white;
    }

    .deleteItem {
        background: darkred;
        color: white;
    }

    .newArticle {
        border: 0;
        padding: 10px;
    }
</style>