<template>
  <div v-show="showModalAdd" class="fixed z-10 inset-0 overflow-y-auto">
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
                  for="name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Name:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    v-model="name"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label
                  for="age"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Age:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input
                    type="text"
                    name="age"
                    id="age"
                    v-model="age"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label
                  for="gender"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Gender:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <select
                    name="gender"
                    id="gender"
                    v-model="gender"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
                    <option value="" selected>--- Select Gender ---</option>
                    "
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Email:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label
                  for="address"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Address:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input
                    type="text"
                    name="address"
                    id="address"
                    v-model="address"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label
                  for="phone"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Phone:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    v-model="phone"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
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
    <Notification :message="errors.message" :key="errors.message" />
  </div>
</template>

<script>
import axios from "axios";
import Notification from "./Notification.vue";
export default {
  name: "ModalAdd",
  components: {
    Notification,
  },
  data() {
    return {
      name: "",
      age: "",
      gender: "",
      email: "",
      address: "",
      phone: "",
      errors: [],
    };
  },
  props: {
    showModalAdd: Boolean,
  },
  methods: {
    submitForm() {
      this.errors = [];
      if (this.name === "") {
        this.errors.message = "The name is missing";
      }
      if (this.age === "" || isNaN(this.age)) {
        this.errors.message = "The age cannot be blank and must be a number";
      }
      if (this.gender === "") {
        this.errors.message = "The gender has not been selected";
      }
      if (this.email === "") {
        this.errors.message = "The email is missing";
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.message = "Please enter a valid email";
      }

      if (this.address === "") {
        this.errors.message = "The address is missing";
      }
      if (this.phone === "" || isNaN(this.phone) || this.phone.length < 10) {
        this.errors.message =
          "The phone cannot be blank, must be a number and length >= 10";
      }
      if (!this.errors.length) {
        if (!localStorage.getItem("CRUD_addEmployeeID")) {
          this.errors.message = "No account ID set in local storage";
        } else {
          const formData = {
            name: this.name,
            age: this.age,
            gender: this.gender,
            email: this.email,
            address: this.address,
            phone: this.phone,
            account_id: localStorage.getItem("CRUD_addEmployeeID"),
          };
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("CRUD_tokenAccess")
                }`,
            },
          };
          axios
            .post("/api/employees", formData, config)
            .then((response) => {
              this.$store.commit("clearAccountId");
              this.$emit("submitForm");
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
        }
      }
    },
    cancelForm() {
      this.$emit("cancelForm");
    },
  },
};
</script>
