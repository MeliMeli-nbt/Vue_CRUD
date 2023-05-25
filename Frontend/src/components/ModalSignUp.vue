<template>
  <div v-show="showModalSignUp" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- overlay -->
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- modal content -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <!-- form -->
            <form>
              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label
                  for="username"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Username:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input
                    type="text"
                    name="username"
                    id="username"
                    v-model="username"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="password"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label
                  for="cfpassword"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Confirm Password:</label
                >
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input
                    type="password"
                    name="cfpassword"
                    id="cfpassword"
                    v-model="cfpassword"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
              </div>
            </form>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              @click="submitForm"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Submit
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              @click="cancelForm"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Notification from "./Notification.vue";
export default {
  name: "ModalSignUp",
  components: {
    Notification
  },
  data() {
    return {
      username: "",
      password: "",
      cfpassword: "",
      errors: [],
    };
  },
  props: {
    showModalSignUp: Boolean,
  },
  methods: {
    submitForm() {
      this.errors = [];
      if (this.username === "") {
        this.errors.message = "The username is missing";
      }
      if (this.password === "") {
        this.errors.message = "The password is missing";
      }
      if (this.password !== this.cfpassword) {
        this.errors.message = "The confirm password is incorrect";
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("CRUD_tokenAccess")
              }`,
          },
        };
        axios
          .post("/api/accounts", formData, config)
          .then((response) => {
            const id = response.data.account_id;
            this.$store.commit("setAccountId", id);
            this.$router.push("/dashboard/boardEmployee");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.message = `${error.response.data[property]}`;
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.message = "Something went wrong. Please try again";
            }
          });
      }
    },
    cancelForm() {
      this.$emit("cancelForm");
    },
  },
};
</script>
