
exports.constants = {
  PORT: 5000,

  APP: {
    NAME: "BMS SERVICE API",
    MESSAGE: function () {
      return `You're successfully connected to ${this.NAME}`;
    },
  },

  DB: {
    URI: "",
    COLLECTION: "sessions",
  },

  DELIMITER: {
    SPACE: " ",
  },

  STATUS: {
    VALIDATION_ERROR: {
      CODE: 400,
      TITLE: "Validation Failed",
    },
    UNAUTHORIZED: {
      CODE: 401,
      TITLE: "Unauthorized",
    },
    FORBIDDEN: {
      CODE: 403,
      TITLE: "Forbidden",
    },
    NOT_FOUND: {
      CODE: 404,
      TITLE: "Not Found",
    },
    SERVER_ERROR: {
      CODE: 500,
      TITLE: "Server Error",
    },
  },

  ORIGIN: {
    // adjust this to your frontend URL
    URL: "http://localhost:5173",
  },

  ERROR: {
    MONGODB_NOT_DEFINE:
      "MONGODB_URI is not defined in the environment variables.",
    CONNECTION_FAILED: "Database connection failed:",
    UNEXPECTED: "An unexpected error occurred. Please try again later.",

    USER: {
      NOT_AUTHORIZED: "User is not authorized",
      NOT_FOUND: "User not found",
      INVALID_CREDENTIALS: "Invalid credentials",
      EMAIL_ALREADY_EXISTS: "Email already exists",
      NO_ACCOUNT: "No account found with this email. Please register.",
      INVALID_EMAIL: "Invalid email format",
      REQUIRED_FIELDS: "Both email and password are required.",
      ALREADY_EXIST: "User already exists",
      UPDATE_FAILED: "An error occurred during the update.",
      INVALID_EMAIL: "Invalid email format",
      REQUIRED_FIELDS: "Both email and password are required.",
    },
  },

  SUCCESS: {
    SERVER: "Server running on port",
    DATABASE: "Database connected:",

    USER: {
      REGISTER: "User registered successfully",
      LOGIN: "Login successful",
      UPDATE: "Update successful",
      DELETE: "Delete successful",
      LOGOUT: "Logout successful, token cleared.",
    },
  },

  METHOD: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },

  VALIDATION: {
    USER: {
      EMAIL: "email",
      PASSWORD: "password",
      ID: "id",
      
    },
  },

  POPULATE: {
    PROJECT: {
      PATH: "members.userId",
      SELECT: "firstname lastname email role",
    },

    USER: {
      PATH: "owner",
      SELECT: "email firstname lastname",
    },
  },

  RESPONSE: {
    ERROR: {
      USER: {
        ID: "userId is missing!",
        NOT_FOUND: "User not found",
        REMOVE: "Error removing user",
        UPDATE: "Error updating user",
        ALREADY_EXISTS: "User already exists",
        NOT_FOUND_ID: "User not found! with the provided _id",
        INVALID_PARAMETER: {
          GET: "userService.get params is missing!",
          CREATE: "userService.create params is missing!",
          UPDATE: "userService.update params is missing!",
          ID: "userService.update params._id is missing!",
          REMOVE: "userService.remove params is missing!",
          SEARCH: "userService.search params is missing!",
        },
      },
    },
  },

  PERMISSIONS: {
    READ: "read",
    WRITE: "write",
    DELETE: "delete",

    ADMIN: "admin",
    USER: "user",
    BO: "bo",
  },
};
