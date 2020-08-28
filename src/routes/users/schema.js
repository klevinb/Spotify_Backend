const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  refreshTokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
