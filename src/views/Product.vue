<template>
  <div>
    <Navbar />
    <h2 class="marginTop100" style="color: white;">Nos Créations</h2>
    <span v-if="articles.length == 0">Aucun article disponible</span>
    <!-- Get all datas -->
    <div class="flex justifyContentCenter flexWrap">
      <div class="item borderRadius5" v-for="post in articles" :key="post.title">
        <img class="borderRadius5" :src="post.imageUrl" />
        <div class="descriptionItem flex flexColumn justifyContentEnd">
          <span class="bold">{{ post.title }}</span>
          <span>{{ post.description }}</span>
          <span>{{ post.price }} €</span>
        </div>
        <div class="buyItem flex alignItemsCenter justifyContentCenter">
          <button class="borderRadius5" @click="addToBasket(post)">Ajouter au panier</button>
        </div>
      </div>
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
        articles: []
      }
    },
    methods: {
      getDatas() {
        axios.get('http://localhost:3000/api/stuff')
          .then(res => {
            this.articles = res.data
          })
          .catch(error => console.log(error));
      },
      createArticle(e) {
        e.preventDefault(); // empeche le refresh de la page
        let formulaire = {};

        formulaire.title = this.title
        formulaire.description = this.description
        formulaire.price = this.price
        // formulaire.imgUrl = this.imgUrl

        axios.post('http://localhost:3000/api/stuff', {
            formulaire
          }).then((res) => {
            console.log(res)
            e.target.reset()
          })
          .catch(error => console.log(error));
      },
      addToBasket(post) {
        console.log(post.id)
      },
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
    height: 70%;
  }

  .item>.descriptionItem {
    height: 15%;
  }

  .item>.buyItem {
    height: 15%;
  }

  .buyItem>button {
    padding: 5px 10px;
    border: 0;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  }
</style>