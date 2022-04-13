<template>
    <div class="home">
        <Navbar />
        <div class="marginTop100 container">
            <h1>Contact</h1>
            <p class="textAlignStart marginTop50">22 ANS DE CRÉATIONS ORIGINALES DEPUIS 1998, NOUS INNOVONS
                ET VOUS PROPOSONS TOUJOURS PLUS D’ASSOCIATIONS DE NOUVELLES SAVEURS. DÉCOUVREZ OU REDÉCOUVREZ
                NOS PLUS BELLES CRÉATIONS.</p>
            <p class="marginTop50 textAlignStart">Nous sommes joignable par téléphone au 07 57 13 74 49 ou par mail en <a href="mailto:afpasushi@gmail.com?subject=Envoyé depuis la page contact">afpasushi@gmail.com</a>.</p>
        </div>
    </div>
</template>


<script>
    import Navbar from '@/components/Navbar.vue'

    export default {
        name: 'Contact',
        components: {
            Navbar
        }
    }
</script>

<style scoped>
    .container {
        color: white;
    }
</style>