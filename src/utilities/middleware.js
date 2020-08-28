const { verifyAccessToken } = require("./functions");
const UserModel = require("../routes/users/schema");

const isUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    
    if(token){
        const credentials = await verifyAccessToken(token)

        if(!credentials)
            res.status(401).send("You need to authenticate yourself!")

        const user = await UserModel.findOne({_id: token._id})
        if(!user)
            res.status(401).send("Username/Password are not correct!")
        
        req.token = token
        req.user = user
        next()
    }
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  isUser,
  isAdmin,
};
