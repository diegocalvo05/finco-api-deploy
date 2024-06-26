const debug = require("debug")("app:auth-middleware");
const { verifyToken } = require("../utils/jwt.tools");
const User = require("../models/User.model");

const ROLES = require("../data/roles.constants.json");

const middlewares = {};
const PREFIX  = "Bearer";

middlewares.authentication = async (req, res, next) => {
  try {
    debug("User Authentication");

    //verifying Authorization header
    const { authorization } = req.headers;

    if(!authorization) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    //verifying token validation
    const [prefix, token] = authorization.split(" ");

    if(prefix !== PREFIX) {
      return res.status(401).json({ error: "User not authenticated" }); 
    } 

    if(!token) {
      return res.status(401).json({ error: "User not authenticated" }); 
    }

    const payload = await verifyToken(token);
    
    if(!payload) {
      return res.status(401).json({ error: "User not authenticated" }); 
    }

    const userId = payload["sub"];

    //verifying user
    const user = await User.findById(userId);

    if(!user) {
      return res.status(401).json({ error: "User not authenticated" }); 
    }

    //comparing token with user tokens
    const isTokenValid = user.tokens.includes(token);

    if(!isTokenValid) {
      return res.status(401).json({ error: "User not authenticated" }); 
    }

    //adding user and token to the request
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

middlewares.authorization = (requiredRole = ROLES.SYSADMIN) => {
  return (req, res, next) => {
    try {
      const { roles=[] } = req.user;

      //verifying if requiredRole is in user.roles
      const isAuth = roles.includes(requiredRole);
      const isSysadmin = roles.includes(ROLES.SYSADMIN);

      if(!isAuth && !isSysadmin) {
        return res.status(403).json({ error: "Forbidden" })
      }

      next();
    } catch (error) {
      next(error);
    }
  } 
}

module.exports = middlewares;