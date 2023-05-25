<template>
  <div>
    <div class="bg-gray-900 min-h-screen flex items-center justify-center">
      <div
        class="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
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
import axios from "axios";
import Notification from "../components/Notification.vue";
import NavDashBoard from "../components/NavDashBoard.vue";
export default {
  name: "dashboard",
  components: {
    NavDashBoard,
    Notification,
  },
  data() {
    return {
      errors: [],
    };
  },
  mounted() {
    if (localStorage.getItem("CRUD_tokenAccess")) {
      this.authAccount();
    }
  },
  methods: {
    async authAccount() {
      try {
        const token = localStorage.getItem("CRUD_tokenAccess");
        if (!token) {
          throw new Error("Access token not found.");
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("/api/authAdmin", config);
        this.$store.commit("setCurrentUser", response.data);
      } catch (error) {
        if (error.response) {
          console.error(error.response.data);
        } else {
          console.error(error.message);
        }
      }
    }

  },
};
</script>