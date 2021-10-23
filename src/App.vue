<template>
  <div id="app">
      <div class="container">
<!--        <router-link to="/">Home</router-link> |-->
<!--        <router-link to="/about">About</router-link>-->
        <router-view/>
      </div>
  </div>
</template>

<style>
body {
  background-color: #D7D7D7;
}
#app {
  font-family: Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/

  max-width: 1140px;
  margin: 0 auto;
}

.container {
  padding: 0;
}
</style>
