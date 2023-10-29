const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();

router.post("/get-otp", UserAuthController.getOtp);
router.post("/check-otp", UserAuthController.checkOtp);

module.exports = {
  UserAuthRoutes: router,
};

//swagger

/**
 * @swagger
 * tags:
 *    name: authPage
 *    description: API to manage auth routes
 */

/**
 * @swagger
 *  /user/get-otp:
 *        post:
 *            summary: login user in userpanel with phone
 *            tags: [authPage]
 *            description: one time password OTP
 *            parameters:
 *            -      name: mobile
 *                   description: fa-IRI phone number
 *                   in: formData
 *                   required: true
 *                   type: string
 *            responses:
 *                   201:
 *                       description: Successful login
 *                   400:
 *                       description: Bad Request
 *                   401:
 *                       description: Unathorization
 *                   500:
 *                       description: Internal server error
 */

/**
 * @swagger
 *  /user/check-otp:
 *        post:
 *            summary: check OTP value
 *            tags: [authPage]
 *            description: check the user one time password OTP
 *            parameters:
 *            -      name: mobile
 *                   description: fa-IRI phone number
 *                   in: formData
 *                   required: true
 *                   type: string
 *            -      name: code
 *                   description: enter sms code
 *                   in: formData
 *                   required: true
 *                   type: string
 *            responses:
 *                   201:
 *                       description: Successful login
 *                   400:
 *                       description: Bad Request
 *                   401:
 *                       description: Unathorization
 *                   500:
 *                       description: Internal server error
 */
