const { ServiceResponse, codes } = require("../vo");

const customerGuard = (req, res, next) => {
  return req.user.userType === "CU" ? next() : res.json(new ServiceResponse(codes.UU_CODE, codes.UU_MSG));
};

const predictorGuard = (req, res, next) => {
  return req.user.userType === "PR" ? next() : res.json(new ServiceResponse(codes.UU_CODE, codes.UU_MSG));
};

const influencerGuard = (req, res, next) => {
  return req.user.userType === "IN" ? next() : res.json(new ServiceResponse(codes.UU_CODE, codes.UU_MSG));
};

module.exports = { customerGuard, predictorGuard, influencerGuard };
