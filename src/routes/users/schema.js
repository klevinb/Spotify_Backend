const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

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
//check the login
UserSchema.static.findByCredentials = async(username,password)=>{
  const user = await UserModel.findOne({username})
  const ifMatch = await bcrypt.compare(password, user.password)
  if(!ifMatch){
    const badLogin = new Error("Your Login Details Are Wrong")
    badLogin.httpStatusCode = 401
throw badLogin
  }
  return user 
}
UserSchema.pre("save", async function(next){
const data = this
if(data.isModified("password")){
  data.password =await bcrypt.hash(data.password, 10)
}
next()
})






const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
