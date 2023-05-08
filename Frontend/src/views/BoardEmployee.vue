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
              class="bg-gray-900 hover:text-gray-200"
              v-for="epl in employee"
              :key="epl.id">
              <td class="p-3">{{ epl.id }}</td>
              <td class="p-3">{{ epl.name }}</td>
              <td class="p-3">{{ epl.age }}</td>
              <td class="p-3">{{ epl.gender }}</td>
              <td class="p-3">{{ epl.email }}</td>
              <td class="p-3">{{ epl.address }}</td>
              <td class="p-3">{{ epl.phone }}</td>
              <td class="p-3">
                <button
                  class="text-gray-400 hover:text-green-500 mx-2"
                  @click="getEmployeeId(epl.id)">
                  <i class="material-icons-outlined text-base">edit</i>
                </button>
                <template v-if="$store.state.isAuthenAdmin">
                  <button
                    class="text-gray-400 hover:text-green-500 ml-2"
                    @click="deleteEmployee(epl.id)">
                    <i class="material-icons-round text-base">delete_outline</i>
                  </button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <template v-if="$store.state.isAuthenAdmin && $store.state.isAccountId">
      <div class="p-3">
        <button
          class="group rounded-2xl h-12 w-32 bg-green-500 text-lg text-white relative overflow-hidden"
          @click="addEmployee()">
          Add
          <div
            class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
        </button>
      </div>
    </template>
    <ModalEdit
      v-if="employeeId !== null"
      :showModalEdit="showModalEdit"
      :employeeId="employeeId"
      @submitForm="handleSubmit"
      @cancelForm="handleCancel">
    </ModalEdit>
    <ModalAdd
      :showModalAdd="showModalAdd"
      @submitForm="handleSubmit"
      @cancelForm="handleCancel">
    </ModalAdd>
    <ModalDeleteEmployee
      v-if="employeeId !== null"
      :showModalDeleteEmployee="showModalDeleteEmployee"
      :employeeId="employeeId"
      @submitForm="handleDelete"
      @cancelForm="handleCancel">
    </ModalDeleteEmployee>
  </div>
</template>

<script>
import axios from "axios";
import ModalEdit from "../components/ModalEdit.vue";
import ModalAdd from "../components/ModalAdd.vue";
import ModalDeleteEmployee from "../components/ModalDeleteEmployee.vue";
export default {
  name: "BoardEmployee",
  components: {
    ModalEdit,
    ModalAdd,
    ModalDeleteEmployee,
  },
  data() {
    return {
      employee: {},
      showModalEdit: false,
      showModalAdd: false,
      showModalDeleteEmployee: false,
      employeeId: null,
      timeout: null
    };
  },
  mounted() {
    this.getListEmployees();
  },
  methods: {
    async getListEmployees() {
      try {
        const response = await axios.get("/api/employees");
        this.employee = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    handleSubmit: function () {
      this.showModalAdd = false;
      this.showModalEdit = false;
    },
    handleCancel: function () {
      this.showModalEdit = false;
      this.showModalAdd = false;
      this.showModalDeleteEmployee = false;
    },
    handleDelete: function () {
      this.showModalDeleteEmployee = false;
    },
    getEmployeeId(id) {
      this.employeeId = id;
      this.showModalEdit = true;
    },
    addEmployee() {
      this.showModalAdd = true;
    },

    deleteEmployee(id) {
      this.employeeId = id;
      this.showModalDeleteEmployee = true;
    },
  },
  watch: {
    employee: {
      deep: true,
      handler() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.getListEmployees();
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
