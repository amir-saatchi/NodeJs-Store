const { default: mongoose } = require("mongoose");

const nameSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  otp: {
    type: Object,
    default: {
      code: "",
      expires: new Date().getDate() + 120,
    },
  },
  bills: { type: [], default: [] },
  discount: { type: Number, default: 0 },
  birthday: { type: String },
  Roles: { type: String, default: "USER" },
});

module.exports = {
  UserModel: mongoose.model("user", Schema),
};
