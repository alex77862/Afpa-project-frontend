<template>
  <div class="paddingLeft50 paddingRight50 flex alignItemsCenter justifyContentBetween navigation">
    <router-link class="logoText flex uppercase decorationNone" to="/">Sushi Afpa</router-link>
    <div class="rightSide">
      <router-link class="decorationNone" to="/Login">Connexion</router-link>
      <router-link class="decorationNone" to="/Contact">Contact</router-link>
      <router-link class="decorationNone" to="/Product">Commander</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style scoped>
  h5 {
    color: white;
  }

  img {
    height: 50%;
    color: white;
  }

  .navigation {
    height: 75px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #424242;
  }

  .rightSide {
    color: white;
  }

  .rightSide>.decorationNone {
    margin: 0 10px;
    color: white;
    text-decoration: none;
  }

  .logoText {
    font-family: 'Quintessential';
    color: white;
    font-size: 2em;
  }

  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .rightSide {
      display: flex;
      flex-direction: column;
    }

    .logoText {
      font-size: 1.3em;
    }

    .navigation {
      padding: 10px;
    }
  }
</style>