const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userRepo = require("../repositories/userRepo");
const logger = require("../config/logger");
const { codes, ServiceResponse } = require("../vo");
const validate = require("validator");
const { comparePassword, generateToken } = require("../utils/security");

// module.exports = passport.use(
//   new LocalStrategy(async(userID, password, done) => {
//     console.log("MISTRSY");
//     const response = new ServiceResponse(codes.GE_CODE, codes.GE_MSG);
//     try {
//         console.log("somethjeh")
//       let user = null;
//       if (validate.isEmail(userID)) {
//         user = await userRepo.findByEmail(userID);
//       } else {
//         user = await userRepo.findByUsername(userID);
//       }

//       // Check if user exists
//       if (!user) {
//         response.status = codes.GE_CODE;
//         response.description = "Invalid login credentials";
//         return done(null, {response});
//         // return res.json(response);
//       }

//       // Check Password
//       if (comparePassword(password, user.password)) {
//         const payload = {
//           userID: user._id,
//           username: user.username,
//           userType: user.userType
//         };
//         response.status = codes.GS_CODE;
//         response.description = codes.GS_MSG;
//         response.data = { token: generateToken(payload) };

//         return done(null, payload);
//       }

//       return done(null, {response});
//     } catch (err) {
//       logger.error(`Error logging user in with message: ${err.message}`);
//       return done(null, {response});
//     }
//   })
// );

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = passport.use(
  "customer",
  new JwtStrategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: "incredibleMagma88"}, async (jwt_payload, done) => {
    //   authenticate.student(jwt_payload.id, done)
    console.log(jwt_payload)
    const userID = jwt_payload.userID
    
    const user = await userRepo.findById(userID);

    if (user) {
      const payload = {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      };
      return done(null, payload);
    }
    return done(null, false);
  })
);
