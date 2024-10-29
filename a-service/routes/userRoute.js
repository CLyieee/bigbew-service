const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const { constants } = require("../config/constantsConfig");
const { API_ENDPOINTS } = require("../config/APIconfig");
const { body, validationResult } = require("express-validator");

// Register User route
router.post(API_ENDPOINTS.USER.CREATE, registerUser);
router.post(API_ENDPOINTS.USER.LOGIN, loginUser);
router.put(
  API_ENDPOINTS.USER.UPDATE,
  userService.requireSignIn,
  userService.updateUser
);


/**
 * @desc   Create a new user
 * @route  POST /api/user/create
 * @access Public
 */
async function registerUser(req, res, next) {
  // Validate input fields
  await Promise.all([
    body(constants.VALIDATION.USER.EMAIL)
      .isEmail()
      .withMessage(constants.ERROR.USER.INVALID_EMAIL)
      .run(req),
    body(constants.VALIDATION.USER.PASSWORD)
      .notEmpty()
      .withMessage(constants.ERROR.USER.REQUIRED_FIELDS)
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await userService.registerUser(req, res, next);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function loginUser(req, res, next) {
  await Promise.all([
    body(constants.VALIDATION.USER.EMAIL)
      .isEmail()
      .withMessage(constants.ERROR.USER.INVALID_EMAIL)
      .run(req),
    body(constants.VALIDATION.USER.PASSWORD)
      .notEmpty()
      .withMessage(constants.ERROR.USER.REQUIRED_FIELDS)
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await userService.loginUser(req, res, next);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateUser(req, res, next) {
  // Validate incoming request
  await Promise.all([
    body("email").isEmail().withMessage("Invalid email").run(req),
    body("password")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Pass req.body directly to the service
    const result = await userService.updateUser(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = router;
