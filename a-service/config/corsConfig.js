const cors = require("cors");
const { constants } = require("./constantsConfig");

const corsOptions = {
  origin: [
    constants.ORIGIN.URL,
    constants.ORIGIN.DEV_BRANCH,
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

module.exports = cors(corsOptions);
