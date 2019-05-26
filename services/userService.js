const userRepo = require("../repositories/userRepo");
const logger = require("../config/logger");
const validateRegistration = require("../validation/registration");
const { hashPassword } = require("../utils/security");
const { codes, ServiceResponse } = require("../vo");

const register = async (req, res, next) => {
  const response = new ServiceResponse(codes.GE_CODE, codes.GE_MSG);
  try {
    const user = req.body;
    logger.info(`Registering user with username: ${user.username}`);

    // Validate user entries
    const validationError = validateRegistration(user);
    if (validationError) {
      return res.json({ validationError });
    }

    // Check if username already exists
    const existingUsername = await userRepo.findByUsername(user.username);
    const existingEmail = await userRepo.findByEmail(user.email);

    if (existingUsername) {
      response.description = "User with this username already exists";
      return res.json(response);
    }

    if (existingEmail) {
      response.description = "User with this email already exists";
      return res.json(response);
    }

    // Hash user password
    const password = hashPassword(user.password);
    user.password = password;

    // Compile user data
    userRepo.add(user);

    response.status = codes.GS_CODE;
    response.description = codes.GS_MSG;

    return res.json(response);
  } catch (err) {
    logger.error(`User Registration Failed with error: ${err.message}`);
    return res.json(response);
  }
};

module.exports = {
  register
};
