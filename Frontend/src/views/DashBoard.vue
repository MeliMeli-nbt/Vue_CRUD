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
    <Notification :message="errors.message" :key="errors.message" />
  </div>
</template>

<script>
import axios from 'axios';
import Notification from '../components/Notification.vue'
import NavDashBoard from '../components/NavDashBoard.vue';
export default {
  name: 'dashboard',
  components: {
    NavDashBoard,
    Notification
  },
  data() {
    return {
      errors: [],
    }
  },
  mounted() {
    this.authAccount();
  },
  methods: {
    async authAccount() {
      const formData = { 
        token: localStorage.getItem('CRUD_tokenAccess')
      }
      await axios
        .post('/api/authAdmin', formData)
        .then((response) => {
          this.$store.commit('setCurrentUser', response.data);
        })
        .catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.message = `${error.response.data[property]}`;
            }
          } else {
            this.errors.message = "Something went wrong. Please try again";
          }
        })
    }
  }
}
</script>