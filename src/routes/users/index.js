const express = require("express");
const UserModel = require("./schema");
const { isUser, isAdmin } = require("../../utilities/middleware");
const { generateTokens } = require("../../utilities/functions");

const router = express.Router();

//Get one:
router.get('/', async(req, res, next)=>{

    const users = await UserModel.find({}, 'username');
    res.status(200).send(users);
})


//Post a new User:
router.post('/register', async(req, res, next) =>{
    const {name, surname, username, password} = req.body;

    const createdUser = await new UserModel ({
        name,
        surname,
        username,
        password
    });

    await createdUser.save();

    res.status(201).send({createdUser})
})

// Update:
router.put("/me", isUser, async (req, res, next) => {
  const updates = Object.keys(req.body);

  updates.forEach((update) => (req.user[update] = req.body[update]));
  await req.user.save();
  res.status(200).send(req.user);
});

//Delete:
router.delete("/me", isUser, async (req, res, next) => {
  await req.user.remove();
  res.status(200).send("User Deleted!");
});

//Login:
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  const user = await UserModel.findByCredentials(username, password);

  const { token, refreshToken } = await generateTokens(user);
  res.cookie("accessToken", token, {
    path: "/",
    httpOnly: true,
    sameSite: true,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/users/refreshToken",
    sameSite: true,
  });

  res.send({ token, refreshToken });
});

//Post a new User:
router.post("/register", async (req, res, next) => {
  const createdUser = new UserModel(req.body);

  await createdUser.save();
  res.status(201).send(createdUser);
});

//Logout:
router.post("/logout", isUser, async (req, res, next) => {
  req.user.refreshToken = req.user.refreshToken.filter(
    (t) => t.token !== req.body.refreshToken
  );
  await req.user.save();
  res.send("Logged out!");
});

//Log out from all devices:
router.post("/logoutAll", isUser, async (req, res, next) => {
  req.user.refreshToken = [];
  await req.user.save();
  res.send("Logged out from all devices!");
});

// Admin Routes

router.delete("/:id", isUser, isAdmin, async (req, res, next) => {
  try {
    await UserModel.findOneAndDelete({ _id: req.params.id });
    res.send("Deleted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
