<template>
    <div class="fullScreen displayFlexCenter">
        <div id="wrapper">
            <p style="text-align: center; width: 100%;" @click="goToHome()">logo</p>
            <p class="logoName margin-top-20" id="logoName" @click="goToHome()">WebsiteName</p>
            <input id="email" type="email" placeholder="email" v-model="email" class="input margin-top-20 input-bottom-bord">
            <input id="password" type="password" placeholder="password" v-model="password" class="input margin-top-20 input-bottom-bord">
            <button @click="signUpMothod" class="button-blue margin-top-20">SignUp</button>
            <p class="center-full-width">Already registered? <strong @click="goToSignIn()" id="signIn">SignIn</strong></p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'signUp',
      'goToHome',
      'goToSignIn',
      'goToHome'
    ]),
    signUpMothod () {
      this.signUp({ email: this.email, password: this.password })
    }
  }
}
</script>

<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 300px;
}

#logoImg {
  height: auto;
  width: 40px;
  display: flex;
  justify-content: center;
}

#logoName {
  text-align: center;
  font-size: var(--font-size-large);
  font-family: var(--font-CountrySide);
}

#logoName:hover {
  cursor: pointer;
}

.margin-top-20 {
  margin-top: 20px;
}

#email {
  margin-top: 0px;
}

.center-full-width {
  width: 100%;
  text-align: center;
  color: gray;
}

#signIn:hover {
  cursor: pointer;
  color: black;
}
</style>
