const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const friendInvitationControllers = require("../controllers/friendInvitationControllers");

const postFriendInvitationSchema = Joi.object({
    targetMailAddress : Joi.string().email(),
});


const inviteDecisionSchema = Joi.object({
    id : Joi.string().required(),
});

router.post("/invite", 
auth, 
validator.body(postFriendInvitationSchema),
friendInvitationControllers.controllers.postInvite
);

router.post(
"/accept", 
auth, 
validator.body(invitateDecisionSchema),
friendInvitationControllers.controllers.postAccept 
);

router.post(
"/reject",
auth,
validator.body(inviteDecisionSchema),
frindsInvitationControllers.controllers.postReject
);

module.exports = router;
