const { authSchema } = require("../../../validators/user/auth.schema");
const createError = require("http-errors");

class UserAuthController {
  async login(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      return res.status(200).send("successfully logged in");
    } catch (error) {
      next(createError.BadRequest(error.message));
    }
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
