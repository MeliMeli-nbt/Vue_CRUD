<template>
  <div
    class="bg-gray-900 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
    <nav
      class="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2 rlink-db">
      <template v-if="$store.state.isAuthenAdmin">
        <router-link
          to="/dashboard/boardEmployee"
          class="p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
          :class="{
            'bg-gray-800 text-white': isActive,
            'text-white/50': !isActive,
          }"
          tag="a"
          @click="toggleActive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 sm:h-6 sm:w-6"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </router-link>
        <!-- Active: bg-gray-800 text-white, Not active: text-white/50 -->
        <router-link
          to="/dashboard/boardAccount"
          class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
          tag="a">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 sm:h-6 sm:w-6"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        </router-link>
      </template>

      <template v-else>
        <router-link
          to="/dashboard/boardEmployeeUser"
          class="p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
          :class="{
            'bg-gray-800 text-white': isActive,
            'text-white/50': !isActive,
          }"
          tag="a"
          @click="toggleActive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 sm:h-6 sm:w-6"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </router-link>
      </template>
    </nav>
    <div
      class="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
      <button
        class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
        tag="a"
        @click="changePassword()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 sm:h-6 sm:w-6"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd" />
        </svg>
      </button>
      <router-link
        to="/"
        class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
        tag="a"
        @click="logOut">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 sm:h-6 sm:w-6"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
      </router-link>
    </div>
    <ModalChangePassword
      :showModalChangePassword="showModalChangePassword"
      @submitForm="handleSubmit"
      @cancelForm="handleCancel">
    </ModalChangePassword>
  </div>
</template>

<script>
import ModalChangePassword from "./ModalChangePassword.vue";
export default {
  name: "NavDashBoard",
  data() {
    return {
      showModalChangePassword: false,
      isActive: false,
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
    logOut() {
      this.$store.commit("logOut");
    },
    changePassword() {
      this.showModalChangePassword = true;
    },
    handleSubmit: function () {
      this.showModalChangePassword = false;
    },
    handleCancel: function () {
      this.showModalChangePassword = false;
    },
  },
  components: { ModalChangePassword },
};
</script>
