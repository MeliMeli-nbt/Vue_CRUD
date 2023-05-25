<template>
  <div v-show="showModalDeleteEmployee" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- overlay -->
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- modal content -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start items-start">
            <label class="block text-sm font-medium leading-6 text-gray-900">Are you sure you want to delete employee?</label>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button type="button" @click="submitForm"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-400 focus:outline-none focus:border-red-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Delete
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
  name: "ModalDeleteEmployee",
  data() {
    return {};
  },
  props: {
    showModalDeleteEmployee: Boolean,
    employeeId: Number,
  },
  methods: {
    submitForm() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("CRUD_tokenAccess")
            }`,
        },
      };
      axios
        .delete(`api/employees/${this.employeeId}`, config)
        .then((response) => {
          this.$emit("submitForm");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelForm() {
      this.$emit("cancelForm");
    },
  },
};
</script>
