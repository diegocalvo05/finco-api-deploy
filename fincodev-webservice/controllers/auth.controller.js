const User = require("../models/User.model");
const { createToken, verifyToken } = require("../utils/jwt.tools");
const ROLES = require("../data/roles.constants.json");

const controller = {};

controller.register = async (req, res, next) => {
  try {
    const { name, lastname, username, email, password } = req.body; //getting user info

    //checking user and email existence
    const user = 
      await User.findOne({ $or: [{username: username}, {email: email}] });

    if(user) {
      return res.status(409).json({ error: "User already exists" });
    }

    //creating new user
    const newUser = new User({
      name: name,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
      roles: [ROLES.USER]
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered" });

  } catch (error) {
    next(error);
  }
}

controller.login = async (req, res, next) => {
  try {
    //getting user info
    const { identifier, password } = req.body;

    //checking user existence
    const user = 
      await User.findOne({ $or:[{username: identifier}, {email: identifier}] });

    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //checking password
    if(!user.comparePassword(password)) { 
      return res.status(401).json({ error: "Incorrect Password" });
    }

    //creating token 
    const token = await createToken(user._id);

    //storing token and verifying sessions - 5 max
    let _tokens = [...user.tokens];
    const _verifyPromises = _tokens.map(async _t => {
      const status = await verifyToken(_t);
      return status ? _t : null;
    });

    _tokens = (await Promise.all(_verifyPromises))
      .filter(_t => _t)
      .slice(0, 4);

    _tokens = [token, ..._tokens];
    user.tokens = _tokens;

    await user.save();

    //returning token
    return res.status(200).json({ token });

  } catch (error) {
    next(error);
  }
}

controller.whoami = async (req, res, next) => {
  try {
    const { _id, name, lastname, username, email, roles } = req.user;

    return res.status(200).json({_id, name, lastname, username, email, roles});
  } catch (error) {
    next(error);
  }
}

controller.grantRole = async (req, res, next) => {
  try {
    const { username, role: newRole } = req.body;

    //getting user
    const user = await User.findOne({ username: username });

    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //getting current user roles
    let _roles = [...user.roles];

    const alreadyIs = _roles.findIndex(_r => _r === newRole) >= 0; //true or false

    //verifying if role is already granted
    if(alreadyIs) {
      return res.status(401).json({ error: "Cannot assign a role twice" });
    } else {
      _roles = [newRole, ..._roles];
    }

    //asigning role to user
    user["roles"] = _roles;

    await user.save();
    
    return res.status(200).json({ message: `Granted ${newRole} role to user: ${user.username}` });
  } catch (error) {
    next(error);
  }
}

controller.revokeRole = async (req, res, next) => {
  try {
    const { username, role: toRevokeRole } = req.body;

    //getting user
    const user = await User.findOne({ username: username });

    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //getting current user
    let _roles = [...user.roles];

    const alreadyIs = _roles.findIndex(_r => _r === toRevokeRole) >= 0; //true or false

    //verifying if role is granted
    if(!alreadyIs) {
      return res.status(401).json({ message: "Cannot revoke a role not assigned previously" });
    } 

    //revoking role to user
    _roles = _roles.filter(_r => _r !== toRevokeRole)
    user["roles"] = _roles;

    await user.save();
    
    return res.status(200).json({ message: `Revoked ${toRevokeRole} role to user: ${user.username}` });
  } catch (error) {
    next(error);
  }
}

module.exports = controller;