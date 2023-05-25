import { createStore } from "vuex";

export default createStore({
  state: {
    accountId: [],
    roleAccount: "",
    token: "",
    isAuthenticated: false,
    isAuthenAdmin: false,
    isAccountId: false,
  },
  mutations: {
    initializePage(state) {
    const roleAccount = JSON.parse(localStorage.getItem("CRUD_currentUser"));
    if (roleAccount && roleAccount.role === "admin") {
      state.isAuthenticated = true;
      state.isAuthenAdmin = true;
    } else if (roleAccount && roleAccount.role !== "admin") {
      state.isAuthenticated = true;
      state.isAuthenAdmin = false;
    } else {
      state.isAuthenticated = false;
      state.isAuthenAdmin = false;
    }
},


    setToken(state, payload) {
      state.token = payload;
      localStorage.setItem("CRUD_tokenAccess", payload);
      state.isAuthenticated = true;
    },

    setAccountId(state, payload) {
      localStorage.setItem("CRUD_addEmployeeID", JSON.stringify(payload));
      if (payload !== null && payload !== undefined) {
        state.accountId = payload;
        state.isAccountId = true;
      }
    },

    clearAccountId(state) {
      state.accountId = [];
      localStorage.removeItem("CRUD_addEmployeeID");
      state.isAccountId = false;
    },

    setCurrentUser(state, payload) {
      localStorage.setItem("CRUD_currentUser", JSON.stringify(payload));
      if (payload !== null && payload !== undefined) {
        state.roleAccount = payload;
        state.isAuthenticated = true;
        if (payload.role === "admin") state.isAuthenAdmin = true;
      }
    },
    
    logOut(state) {
      state.roleAccount = null;
      state.token = "";
      localStorage.removeItem("CRUD_currentUser");
      localStorage.removeItem("CRUD_tokenAccess");
      state.isAuthenticated = false;
      state.isAuthenAdmin = false;
    },
  },
  actions: {},
  modules: {},
});
