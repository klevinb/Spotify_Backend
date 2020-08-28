const { verifyAccessToken } = require("./functions");
const UserModel = require("../routes/users/schema");

const isUser = async(req, res, next) => {
  try {
    const token = req.cookies.token;

    
    if(token){
        const credentials = await verifyAccessToken(token)
console.log(credentilas)
        if(!credentials)
            res.status(401).send("You need to authenticate yourself!")

        const user = await UserModel.findOne({_id: token._id})
        console.log(user)
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
