<template>
  <div class="vc-panel">
    <MainPage class="vh-full"></MainPage>
  </div>
</template> 

<script>

import MainPage from './pages/main/MainPage.vue';
export default {
  name: 'App',
  components: {
    MainPage
  },
  data(){
    return {
      
    }
  },
  methods:{
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>
