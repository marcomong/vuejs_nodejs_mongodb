<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('tryAutoSignIn', this.$route.name)
  }
}
</script>

<style>
/* VARIABLES */
:root {
  --color-blue: #2980B9;
  --color-ligth-blue: rgb(81, 152, 199);
  --color-gray: #707070;
  --color-medium-gray: #D5D5D5;
  --color-light-gray: #F7F7F7;
  --color-white: white;
  --font-Lato: 'Lato', sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: var(--font-Lato)
}

/* FONT */
.font-size-xlarge {
  font-size: 44px;
}

.font-size-large {
  font-size: 38px;
}

.font-size-medium {
  font-size: 24px;
}

.font-text-center {
  text-align: center;
}

/* INPUTS */
.input {
  height: 60px;
  min-width: 100%;
  max-width: 450px;
  border: 1px solid white;
  background-color: var(--color-white);
  font-size: 18px;
}

.input::placeholder {
  color: var(--color-medium-gray);
  padding: 0px 5px;
}

.input:focus {
  outline: none !important;
  border: 1px solid var(--color-blue);
}

.input-bottom-bord {
  border-bottom: 1px solid var(--color-blue);
  margin-bottom: 1px;
}

.input-bottom-bord:focus {
  border: none;
  border-bottom: 2px solid var(--color-blue);
  margin-bottom: 0px;
}

.input-bottom-bord::placeholder {
  font-weight: 100;
}

/* ERROR */
.error {
  color: red;
  text-align:  center;
  font-size: var(--font-size-medium);
  font-weight: 100;
}

/* BUTTONs */
.button-blue {
  background-color: var(--color-blue);
  color: var(--color-white);
  border: none;
  padding: 5px 30px;
  font-size: 18px;
}

.button-blue:hover,
.button-blue:focus {
  background-color: var(--color-ligth-blue);
  cursor: pointer;
  outline: none !important;
}

/* ALIGNMENT */
.centerX {
  margin: auto;
  width: 50%;
}

.centerY {
  margin: 0;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fullScreen {
  width: 100wh;
  height: 100%;
  min-height: 100vh;
}

.displayFlexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
