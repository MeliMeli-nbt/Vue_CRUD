import { createStore } from "vuex";

export default createStore({
  state: {
    accountId: [],
    roleAccount: "",
    isAuthenticated: false,
    isAuthenAdmin: false,
    isAccountId: false,
  },
  mutations: {
    initializePage(state) {
      const roleAccount = localStorage.getItem("roleAccount");
      if (roleAccount !== null) {
        state.isAuthenticated = true;
        if ( JSON.parse(localStorage.getItem('roleAccount')) === "admin") {
          state.isAuthenAdmin = true;
        } else {
          state.isAuthenAdmin = false;
        }
      } else {
        state.isAuthenticated = false;
        state.isAuthenAdmin = false;
      }
    },
    setAccountId(state, payload) {
      localStorage.setItem("accountId", JSON.stringify(payload));
      if (payload !== null && payload !== undefined) {
        state.accountId = payload;
        state.isAccountId = true;
      }
    },
    clearAccountId(state) {
      state.accountId = [];
      localStorage.removeItem("accountId");
      state.isAccountId = false;
    },
    setRole(state, payload) {
      localStorage.setItem("roleAccount", JSON.stringify(payload));
      if (payload !== null && payload !== undefined) {
        state.roleAccount = payload;
        state.isAuthenticated = true;
        if (payload === "admin") state.isAuthenAdmin = true;
      }
    },
    logOut(state) {
      state.roleAccount = null;
      localStorage.removeItem("roleAccount");
      state.isAuthenticated = false;
      state.isAuthenAdmin = false;
    },
  },
  actions: {},
  modules: {},
});
