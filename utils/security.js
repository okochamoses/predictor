const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

generateToken = data => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRY)
  });
};

module.exports = { hashPassword, comparePassword, generateToken };
