<template>
  <div class="home">
    <Navbar/>
    <div class="banner"></div>
    <div class="order marginTop50 paddingTop25">
      <router-link class="borderRadius5 bold" to="/Product">Passer commande</router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style scoped>
  .banner {
    background-image: url('../assets/banner.png');
    background-size: cover;
    background-repeat: no-repeat;
    height: 80vh;
  }

  .order > a{
    padding: 15px;
    background: #90da68;
    text-decoration: none;
    color: #1a1a1a;
  }
</style>
