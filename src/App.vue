<template>
  <div id="app">
    <Navbar />
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  }  
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap'); */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* font-family: 'Nunito Sans', sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 350px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
