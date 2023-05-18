<template>
  <div class="flex items-start justify-center w-full">
    <div class="col-span-12">
      <div class="overflow-auto lg:overflow-visible">
        <table class="table text-gray-400 border-separate space-y-6 text-sm">
          <thead class="bg-gray-900 text-gray-500">
            <tr>
              <th class="p-3 text-left">ID</th>
              <th class="p-3 text-left">Name</th>
              <th class="p-3 text-left">Age</th>
              <th class="p-3 text-left">Gender</th>
              <th class="p-3 text-left">Email</th>
              <th class="p-3 text-left">Address</th>
              <th class="p-3 text-left">Phone</th>
              <th class="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-gray-900 hover:text-gray-200">
              <td class="p-3">{{ employee.id }}</td>
              <td class="p-3">{{ employee.name }}</td>
              <td class="p-3">{{ employee.age }}</td>
              <td class="p-3">{{ employee.gender }}</td>
              <td class="p-3">{{ employee.email }}</td>
              <td class="p-3">{{ employee.address }}</td>
              <td class="p-3">{{ employee.phone }}</td>
              <td class="p-3">
                <button
                  class="text-gray-400 hover:text-green-500 mx-2"
                  @click="getEmployeeId(employee.id)">
                  <i class="material-icons-outlined text-base">edit</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ModalEdit
      v-if="employeeId !== null"
      :showModalEdit="showModalEdit"
      :employeeId="employeeId"
      @submitForm="handleSubmit"
      @cancelForm="handleCancel">
    </ModalEdit>
    <Notification :message="errors.message" :key="errors.message" />
  </div>
</template>

<script>
import axios from "axios";
import ModalEdit from "../components/ModalEdit.vue";
import Notification from "../components/Notification.vue";
export default {
  name: "BoardEmployee",
  components: {
    ModalEdit,
    Notification
  },
  data() {
    return {
      employee: {},
      currentUser: "",
      showModalEdit: false,
      employeeId: null,
      timeout: null,
      errors: []
    };
  },
  mounted() {
    this.getCurrentUser();
    this.getEmployee();
  },
  methods: {
    getCurrentUser() {
      this.currentUser = JSON.parse(localStorage.getItem("CRUD_currentUser"));
    },
    async getEmployee() {
      this.error = [];
      try {
        const response = await axios.get(
          `/api/employees/${this.currentUser.account_id}`
        );
        this.employee = response.data;
      } catch (error) {
        if (error.response) {
          for (const property in error.response.data) {
            this.errors.message = `${error.response.data[property]}`;
          }
        } else {
          this.errors.message = "Something went wrong. Please try again";
        }
      }
    },
    handleSubmit: function () {
      this.showModalEdit = false;
    },
    handleCancel: function () {
      this.showModalEdit = false;
    },
    getEmployeeId(id) {
      this.employeeId = id;
      this.showModalEdit = true;
    },
  },
  watch: {
    employee: {
      deep: true,
      handler() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.getEmployee();
        }, 500);
      },
    },
  },
};
</script>
<style scoped>
.table {
  border-spacing: 0 15px;
}

i {
  font-size: 1rem !important;
}

.table tr {
  border-radius: 20px;
}

tr td:nth-child(n + 8),
tr th:nth-child(n + 8) {
  border-radius: 0 0.625rem 0.625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: 0.625rem 0 0 0.625rem;
}
</style>
