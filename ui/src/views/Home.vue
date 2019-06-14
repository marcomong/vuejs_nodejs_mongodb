<template>
  <div class="home">
    <app-header></app-header>
    <main-body></main-body>
    <app-footer></app-footer>
  </div>
</template>

<script>
import mainBody from '@/components/Home/MainBody.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    appHeader: Header,
    appFooter: Footer,
    mainBody
  }
}
</script>

<style scoped>
  .home {
    margin: 0;
    padding: 0;
  }
</style>
