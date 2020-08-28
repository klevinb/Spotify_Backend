const jwt = require("jsonwebtoken");
const UserModel = require("../routes/users/schema");

const generateTokens = async(user) => {
  try {
      const newAccessToken = await generateAccessToken({_id: user._id})
      const newRefreshToken = await generateRefreshToken({_id: user._id})
    
      const newUser = await UserModel.findOne({_id: user._id})
    
      newUser.refreshTokens.push({token: newRefreshToken})
      await newUser.save()

      return {token: newAccessToken, refreshToken: newRefreshToken}
  } catch (error) {
    console.log(error);
  }
};

const generateAccessToken = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });

  const verifyAccessToken = (token) =>
    new Promise((resolve, reject) =>{
        jwt.verify(token, process.env.SECRET_KEY, (err, credentials) => {
            if(err){
                if(err.name == "TokenExpiredError"){
                    resolve()
                }else{
                    reject(err)
                }
            }else{
                resolve(credentials)
            }
        })
    })

const generateRefreshToken = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECOND_SECRET_KEY,

      { expiresIn: 900 },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });

module.exports = {
    generateTokens,
    verifyAccessToken
}