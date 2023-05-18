<template>
  <div class="w-full lg:w-4/12 px-4 mx-auto pt-6">
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-500 border-0">
      <div class="rounded-t mb-0 px-6 py-6">
        <hr class="mt-6 border-b-1 border-gray-400" />
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form>
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-password"
              >Username</label
            ><input
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Username"
              v-model="username" />
          </div>
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-password"
              >Password</label
            ><input
              type="password"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Password"
              v-model="password" />
          </div>
          <div class="text-center mt-6">
            <button
              class="bg-gray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              @click="submitForm">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
    <Notification :message="errors.message" :key="errors.message" />
  </div>
</template>

<script>
import axios from "axios";
import Notification from "../components/Notification.vue";
export default {
  name: "LogIn",
  components: {
    Notification
  },
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    async submitForm() {
      const formData = {
        username: this.username,
        password: this.password,
      };

      await axios
        .post("/api/login", formData)
        .then((response) => {
          this.$store.commit("setToken", response.data.token);
          const toPath = this.$route.query.to || "/dashboard";
          this.$router.push(toPath);
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.message = `${error.response.data[property]}`;
            }
          } else {
            this.errors.message = "Something went wrong. Please try again";
          }
        });
    },
  },
};
</script>
