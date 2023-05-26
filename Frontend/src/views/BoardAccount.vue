<template>
  <div class="flex items-start justify-center w-full">
    <div class="col-span-12">
      <div class="overflow-auto lg:overflow-visible">
        <table class="table text-gray-400 border-separate space-y-6 text-sm">
          <thead class="bg-gray-900 text-gray-500">
            <tr>
              <th class="p-3 text-left">ID</th>
              <th class="p-3 text-left">Username</th>
              <th class="p-3 text-left">Password</th>
              <th class="p-3 text-left">Role</th>
              <th class="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-gray-900 hover:text-gray-200"
              v-for="act in account"
              :key="act.id">
              <td class="p-3">{{ act.account_id }}</td>
              <td class="p-3">{{ act.username }}</td>
              <td class="p-3">{{ act.password }}</td>
              <td class="p-3">{{ act.role }}</td>
              <td class="p-3">
                <button
                  class="text-gray-400 hover:text-green-500 mx-2"
                  @click="grantPermission(act.account_id, act.role)">
                  <i class="material-icons-outlined text-base">edit</i>
                </button>
                <button
                  class="text-gray-400 hover:text-green-500 ml-2"
                  @click="deleteAccount(act.account_id)">
                  <i class="material-icons-round text-base">delete_outline</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <template v-if="$store.state.isAccountId === false">
      <div class="p-3">
        <button
          class="group rounded-2xl h-12 w-32 bg-green-500 text-lg text-white relative overflow-hidden"
          @click="addAccount()">
          Add
          <div
            class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
        </button>
      </div>
    </template>
    <ModalSignUp
      :showModalSignUp="showModalSignUp"
      @submitFormAccount="handleSubmit"
      @cancelForm="handleCancel">
    </ModalSignUp>
    <ModalDeleteAccount
      v-if="accountId !== null"
      :showModalDeleteAccount="showModalDeleteAccount"
      :accountId="accountId"
      @submitForm="handleDelete"
      @cancelForm="handleCancel">
    </ModalDeleteAccount>
    <ModalPermission
      :showModalPermission="showModalPermission"
      :accountIdUpdate="accountIdUpdate"
      :roleUpdate="roleUpdate"
      @submitForm="handleSubmit"
      @cancelForm="handleCancel"
    >
    </ModalPermission>
    <Notification :message="errors.message" :key="errors.message" />
  </div>
</template>

<script>
import axios from "axios";
import ModalSignUp from "../components/ModalSignUp.vue";
import ModalDeleteAccount from "../components/ModalDeleteAccount.vue";
import ModalPermission from "../components/ModalPermission.vue";
import Notification from "../components/Notification.vue";
export default {
  name: "BoardAccount",
  data() {
    return {
      account: [],
      accountId: null,
      showModalSignUp: false,
      showModalDeleteAccount: false,
      showModalPermission: false,
      timeout: null,
      accountIdUpdate: null,
      roleUpdate: null,
      errors: [],
    };
  },
  components: {
    ModalSignUp,
    ModalDeleteAccount,
    Notification,
    ModalPermission
  },
  mounted() {
    this.getListAccounts();
  },
  methods: {
    async getListAccounts() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("CRUD_tokenAccess")
            }`,
        },
      };
      try {
        const res = await axios.get("/api/accounts", config);
        this.account = res.data;
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
    addAccount() {
      this.showModalSignUp = true;
    },

    handleSubmit: function () {
      this.showModalSignUp = false;
      this.showModalPermission = false;
    },
    handleCancel: function () {
      this.showModalSignUp = false;
      this.showModalDeleteAccount = false;
    },
    handleDelete: function () {
      this.showModalDeleteAccount = false;
    },
    deleteAccount(id) {
      this.showModalDeleteAccount = true;
      this.accountId = id;
    },
    grantPermission(id, role) {
      this.showModalPermission = true;
      this.accountIdUpdate = id;
      this.roleUpdate = role;
    },
  },
  // watch: {
  //   account: {
  //     deep: true,
  //     handler() {
  //       clearTimeout(this.timeout);
  //       this.timeout = setTimeout(() => {
  //         this.getListAccounts();
  //       }, 500);
  //     },
  //   },
  // },
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

tr td:nth-child(n + 5),
tr th:nth-child(n + 5) {
  border-radius: 0 0.625rem 0.625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: 0.625rem 0 0 0.625rem;
}
</style>
