<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from '../components/HeaderHome.vue'
export default {
  name: 'home',
  components: {
    Header,
  }
}
</script>

<style scoped>
.background {
  background-position: 100%;
  background-image: url('../assets/imgs/background.png');
}
</style>