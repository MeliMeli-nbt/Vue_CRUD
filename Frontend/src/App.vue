<template> 
  <div class="mx-auto">
    <RouterView/>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate() {
    this.$store.commit('initializePage');
  }
}
</script>