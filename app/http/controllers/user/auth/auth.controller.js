const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const createError = require("http-errors");
const { randomNumber, SignAccessToken } = require("../../../../utils/function");
const { UserModel } = require("../../../../models/users");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constants");
const Controller = require("../../controller");

class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = randomNumber();
      const result = await this.saveUser(mobile, code);
      if (!result) throw createError.Unauthorized("logging failed");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "successfully logged in",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(createError.BadRequest(error.message));
    }
  }

  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user) throw createError.NotFound("user not found");
      if (user.otp.code != code) {
        console.log(user);
        throw createError.Unauthorized("invalid otp code");
      }
      if (+user.otp.expireIn < Date.now())
        throw createError.Unauthorized("otp code expired");
      const accessToken = await SignAccessToken(user._id);
      return res.json({
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async saveUser(mobile, code) {
    let otp = {
      code,
      expiresIn: EXPIRES_IN,
    };
    const result = await this.checkExistUser(mobile);
    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({ mobile, otp, Roles: [USER_ROLE] }));
  }

  async checkExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }

  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key])) {
        delete objectData[key];
      }
    });
    console.log(objectData);
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );

    console.log(updateResult);
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
