const { default: mongoose } = require("mongoose");
const { UserModel } = require("./app/models/users");

async function saveuser() {
  await mongoose.connect("mongodb://0.0.0.0:27017/StoreDB");
  const user = await UserModel.create({
    userName: "amir17252",
    mobile: "09359640121",
  });
  console.log(user);
}

saveuser();
