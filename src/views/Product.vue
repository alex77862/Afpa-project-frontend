<template>
  <div>
    <Navbar />
    <h2 class="marginTop100" style="color: white;">Nos Créations</h2>
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
        <div class="buyItem flex alignItemsCenter justifyContentCenter">
          <button class="borderRadius5" @click="addToBasket(post)">Ajouter au panier</button>
        </div>
      </div>
    </div>

    <div v-if="cart.length > 0" class="shoppingCart shadow borderRadius5" id="shoppingCart">
      <h2 class="textAlignCenter">Panier</h2>
      <div class="productItem flex flexWrap">
        <div v-for="product, id in cart" class="itemInBasket shadow borderRadius5" v-bind:key="product.id">
          <div class="cartItem">
            <p>{{ product.title }}</p>
            <img v-bind:src='product.img' alt="" height="75" width="75">
            <p>{{ product.description }}</p>
            <p>{{ product.price }} €</p>
            <p>{{ product.quantity }} dans le panier</p>
          </div>
          <div class="cartButtons">
            <button class="border1" v-on:click="cartPlusOne(product)">+</button>
            <button class="border1" v-on:click="cartMinusOne(product, id)">-</button>
            <button class="border1" @click="cartRemoveItem(id)">D</button>
          </div>
        </div>
      </div>

      <div class="totalCost">
        <div class="total">
          <h2>Total:</h2>
          <h2>{{ cartTotalAmount() }}€</h2>
          <span>Total articles: {{ itemTotalAmount() }}</span>
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
        articles: [],
        cart: []
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
        // check if already in array
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === post._id) {
            return this.cart[i].quantity++
          }
        }
        this.cart.push({
          id: post._id,
          img: post.image_url,
          title: post.title,
          description: post.description,
          price: post.price,
          quantity: 1
        })
      },
      cartPlusOne(product) {
        product.quantity = product.quantity + 1;
      },
      cartMinusOne(product, id) {
        if (product.quantity == 1) {
          this.cartRemoveItem(id);
        } else {
          product.quantity = product.quantity - 1;
        }
      },
      cartRemoveItem(id) {
        this.cart.splice(id, 1);
      },
      cartTotalAmount() {
        let total = 0;
        for (let item in this.cart) {
          total = total + (this.cart[item].quantity * this.cart[item].price)
        }
        return total;
      },
      itemTotalAmount() {
        let itemTotal = 0;
        for (let item in this.cart) {
          itemTotal = itemTotal + (this.cart[item].quantity);
        }
        return itemTotal;
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
  .shoppingCart {
    background: white;
    color: black;
    width: 80%;
    margin: 50px auto;
  }

  .cartButtons {
    margin: 10px;
  }

  .cartButtons > button {
    margin: 0 5px;
    border-radius: 25px;
    height: 25px;
    width: 25px;
  }

  .itemInBasket {
    padding: 2px 15px;
    margin: 15px;
  }

  .cartItem > p {
    margin: 0;
  }

  .total > span {
    color: black;
  }

  span,
  h3 {
    color: white;
  }

  .cartItem>span {
    color: black;
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
    padding: 5px 10px;
    border: 0;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  }
</style>