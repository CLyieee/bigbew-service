// config/APIconfig.js

module.exports = {
  API_ENDPOINTS: {
    MAIN: {
      DEFAULT: "/api",
    },

    USER: {
      GET_ALL: "/user/get/all",
      GET_BY_ID: "/user/get/:id",
      CREATE: "/user/create",
      UPDATE: "/user/update",
      REMOVE: "/user/remove/:id",
      LOGIN: "/user/login",
      LOGOUT: "/user/logout",
      CHECKLOGIN: "/current/user",
      SEARCH: "/user/search",
    },

    ORDER: {
      CREATE: "/order/create",
      GET_ALL: "/orders/get/all",
      UPDATE_STATUS: "/order/update/:orderNumber", // Ensure this is defined
    },
  },
};
