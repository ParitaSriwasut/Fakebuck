const createError = require("../utils/create-error");
const {
  checkReceiverIdSchema,
  checkFriendIdSchema,
} = require("../validators/user-validator");
const { checkRequesterIdSchema } = require("../validators/user-validator");
const prisma = require("../models/prisma");
const { STATUS_PENDING, STATUS_ACCEPTED } = require("../config/constants");

exports.requestFriend = async (req, res, next) => {
  try {
    //logic for requestFriend
    const { error, value } = checkReceiverIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    //check if same person can not request friend youself
    if (value.receiverId === req.user.id) {
      return next(createError("cannot request yourself", 400));
    }
    const targetUser = await prisma.user.findUnique({
      where: {
        id: value.receiverId,
      },
    });
    if (!targetUser) {
      return next(createError("user does not exist", 400));
    }
    // 2  and 1 have already send request
    //select * from friend where requesterId = 1 AND receiverId = 2
    //OR requesterId = 2 AND receiverId = 1
    const existRelationship = await prisma.friend.findFirst({
      where: {
        OR: [
          { requesterId: req.user.id, receiverId: value.receiverId },
          { requesterId: value.receiverId, receiverId: req.user.id },
        ],
      },
    });

    if (existRelationship) {
      return next(createError("user already has relationship", 400));
    }
    //after validate , create to table friedn
    await prisma.friend.create({
      data: {
        requesterId: req.user.id,
        receiverId: value.receiverId,
        status: STATUS_PENDING,
      },
    });

    res.status(201).json({ message: "request has been sent" });
  } catch (err) {
    next(err);
  }
};

exports.acceptRequest = async (req, res, next) => {
  try {
    const { value, error } = checkRequesterIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const existRelationship = await prisma.friend.findFirst({
      where: {
        requesterId: value.requesterId,
        receiverId: req.user.id,
        status: STATUS_PENDING,
      },
    });
    if (!existRelationship) {
      return next(createError("relationship does not exits", 400));
    }
    await prisma.friend.update({
      data: {
        status: STATUS_ACCEPTED,
      },
      where: {
        id: existRelationship.id,
      },
    });
    res.status(200).json({ message: " Friend Accepted" });
  } catch (err) {
    next(err);
  }
};

exports.rejectRequest = async (req, res, next) => {
  try {
    const { value, error } = checkRequesterIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }

    const existRelationship = await prisma.friend.findFirst({
      where: {
        receiverId: req.user.id,
        requesterId: value.requesterId,
        status: STATUS_PENDING,
      },
    });
    if (!existRelationship) {
      return next(createError("relationship does not exist", 400));
    }

    await prisma.friend.delete({
      where: {
        id: existRelationship.id,
      },
    });
    res.status(200).json({ message: "Rejected" });
  } catch (err) {
    next(err);
  }
};

exports.cancelRequest = async (req, res, next) => {
  try {
    const { value, error } = checkReceiverIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const existRelationship = await prisma.friend.findFirst({
      where: {
        requesterId: req.user.id,
        receiverId: value.receiverId,
        status: STATUS_PENDING,
      },
    });
    if (!existRelationship) {
      return next(createError("relationship does not exist", 400));
    }

    await prisma.friend.delete({
      where: {
        id: existRelationship.id,
      },
    });

    res.status(200).json({ message: "success cancellation" });
  } catch (err) {
    console.log(err);
  }
};

exports.unfriend = async (req, res, next) => {
  try {
    console.log(req.params);
    const { value, error } = checkFriendIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const existRelationship = await prisma.friend.findFirst({
      where: {
        OR: [
          { requesterId: req.user.id, receiverId: value.friendId },
          { requesterId: value.friendId, receiverId: req.user.id },
        ],
        status: STATUS_ACCEPTED,
      },
    });
    if (!existRelationship) {
      return next(createError("relation does not exist", 400));
    }
    await prisma.friend.delete({
      where: {
        id: existRelationship.id,
      },
    });
    res.status(200).json({ message: "friendship terminated" });
  } catch (err) {
    next(err);
  }
};
