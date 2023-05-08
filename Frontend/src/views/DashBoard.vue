<template>
  <div>
    <div class="bg-gray-900 min-h-screen flex items-center justify-center">
      <div class="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
        <!-- Navigation -->
        <NavDashBoard></NavDashBoard>
        <!-- /Navigation -->
        <!-- Content -->
        <router-view></router-view>
        <!-- /Content -->
      </div>
    </div>
  </div>
</template>

<script>
import NavDashBoard from '../components/NavDashBoard.vue';
export default {
  name: 'dashboard',
  components: {
    NavDashBoard,
  }
}
</script>