<template>
  <div v-show="showModalEditAdmin" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input type="text" name="name" id="name" v-model="employeeData.name"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label for="age" class="block text-sm font-medium leading-6 text-gray-900">Age:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input type="text" name="age" id="age" v-model="employeeData.age"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label for="gender" class="block text-sm font-medium leading-6 text-gray-900">Gender:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input type="text" name="gender" id="gender" v-model="employeeData.gender"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input type="email" name="email" id="email" v-model="employeeData.email"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input type="text" name="address" id="address" v-model="employeeData.address"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-3 sm:mt-0 sm:ml-4">
                <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone:
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>

                  <input type="text" name="phone" id="phone" v-model="employeeData.phone"
                    class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button type="button" @click="submitForm"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Submit
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button type="button" @click="cancelForm"
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
export default {
  name: "ModalEditAdmin",
  data() {
    return {
      employeeData: {
        name: "",
        age: "",
        gender: "",
        email: "",
        address: "",
        phone: "",
      },
      errors: [],
    };
  },
  props: {
    showModalEditAdmin: Boolean,
    employeeId: Number,
  },
  mounted() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("CRUD_tokenAccess")
          }`,
      },
    };
    axios
      .get(`/api/edit/${this.employeeId}`, config)
      .then((res) => {
        this.employeeData = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async submitForm() {
      this.errors = [];
      if (this.employeeData.name === "") {
        this.errors.push("The name is missing");
      }
      if (this.employeeData.age === "" || isNaN(this.employeeData.age)) {
        this.errors.push("The age cannot be blank and must be a number");
      }
      if (this.employeeData.gender === "") {
        this.errors.push("The gender has not been selected");
      }
      if (this.employeeData.email === "") {
        this.errors.push("The email cannot be blank");
      }
      if (this.employeeData.address === "") {
        this.errors.push("The address cannot be blank");
      }
      if (
        this.employeeData.phone === "" ||
        isNaN(this.employeeData.phone) ||
        this.employeeData.phone.length < 10
      ) {
        this.errors.push(
          "The phone cannot be blank, must be a number and length >= 10"
        );
      }
      if (!this.errors.length) {
        const formData = this.employeeData;
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("CRUD_tokenAccess")
              }`,
          },
        };
        await axios
          .put(`/api/admin/employees/${this.employeeId}`, formData, config)
          .then((response) => {
            this.$emit("submitForm");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    cancelForm() {
      this.$emit("cancelForm");
    },
  },
};
</script>
