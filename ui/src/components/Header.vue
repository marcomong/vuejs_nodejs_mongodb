<template>
  <div id="container">
      <p class="left button-blue" @click="goToHome()">Home</p>
      <p v-if="!isLogged" class="right button-blue margin-left-10" @click="goToSignIn()">SignIn</p>
      <p v-if="!isLogged" class="right button-blue" @click="goToSignUp()">SignUp</p>
      <p v-if="isLogged" class="right button-blue margin-left-10" @click="logOut()">LogOut</p>
      <p v-if="isLogged" class="right button-blue" @click="goToDashboard()">Dashboard</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'goToSignIn',
      'goToHome',
      'goToSignUp',
      'logOut',
      'goToDashboard'
    ])
  },
  computed: {
    ...mapGetters([
      'isLogged'
    ])
  }
}
</script>

<style>
  #container {
    overflow: hidden;
    padding: 10px;
    color: black;
    background-color: transparent;
    box-shadow: 0px 0px 2px lightgray;
  }

  .right {
    float: right;
  }

  .left {
    float: left;
  }

  .margin-left-10 {
    margin-left: 10px;
  }

</style>
