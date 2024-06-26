const Group = require("../models/Group.model");

const controller = {};

controller.save = async(req,res,next) => {
  try {
    const { group_name, mount_saved, description } = req.body;
    const { identifier } = req.params;
    const { user } = req;

    let group = await Group.findById(identifier);

    if(!group) {
      group = new Group();
      group["creator"] = user._id;
    } else {
      if(!group["creator"].equals(user._id)) {
        return res.status(403).json({ error: "group can only be edited by its creator" });
      }
    }

    group["group_name"] = group_name;
    //group["mount_saved"] = mount_saved;
    group["description"] = description;
    group["members"] = [user._id]; //making the creator a member

    const savedGroup = await group.save()

    if(!savedGroup) {
      return res.status(409).json({ error: "Error creating group, try again later" });
    }

    return res.status(201).json(savedGroup);
  } catch (error) {
    next(error);
  }
}

controller.joinGroup = async (req, res, next) => {
  try {
    const { user } = req;
    const { identifier } = req.params;

    let group = await Group.findById(identifier).populate("members", "username");

    if(!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    let _members = group["members"] || [];

    const alreadyMember = _members.findIndex(_i => _i.equals(user._id)) >= 0; //returns true or false
    
    if(alreadyMember) {
      return res.status(403).json({ error: "User is already a group member" });
    } else {
      _members = [user._id, ..._members];
    }

    group["members"] = _members;

    const savedGroup = await (await group.save()).populate("members", "username");

    return res.status(200).json(savedGroup);
  } catch (error) {
    next(error);
  }
}

controller.exitGroup = async (req, res, next) => {
  try {
    const { user } = req;
    const { identifier } = req.params;

    let group = await Group.findById(identifier).populate("members", "username");

    if(!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    let _members = group["members"] || [];

    const isMember = _members.findIndex(_i => _i.equals(user._id)) >= 0; //returns true or false
    
    if(isMember) {
      _members = _members.filter(_i => !_i.equals(user._id));
    } else {
      return res.status(403).json({ error: "User is not a group member" });
    }

    group["members"] = _members;

    const savedGroup = await (await group.save()).populate("members", "username");

    return res.status(200).json(savedGroup);
  } catch (error) {
    next(error);
  }
}

controller.findMyGroups = async (req, res, next) => {
  try {
    const { user } = req;

    const groups = await Group.find().populate("members", "username").populate("creator", "username");

    if(!groups) {
      return res.status(404).json({ error: "Groups not found" });
    }

    const userGroups = (groups.map(_g => {
      const _members = _g["members"] || [];
      const isMember = _members.findIndex(_i => _i.equals(user._id)) >= 0;
      
      if(isMember) return _g;

      return null;
    })).filter(_i => _i !== null);

    if(userGroups.length === 0) {
      return res.status(404).json({ error: "No groups to show" });
    }

    return res.status(200).json({ userGroups });
  } catch (error) {
    next(error);
  }
}

controller.getOneGroup = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    const group = await Group.findById(identifier).populate("members", "username").populate("creator", "username");

    if(!group) return res.status(404).json({ error: "Group not found" });

    return res.status(200).json({ group });
  } catch (error) {
    next(error);
  }
}

module.exports = controller;