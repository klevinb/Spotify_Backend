const express = require("express");
const axios = require("axios");
const { isUser } = require("../../utilities/middleware");

const router = express.Router();

router.get("/artitisInfo/:id", isUser, (req, res, next) => {
  try {
    let artist = [];
    Promise.all([
      axios(process.env.RAPIDAPI_API + "/artist/" + req.params.id, {
        method: "get",
        headers: {
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
      }).then((res) => artist.push(res.data)),

      axios(
        process.env.RAPIDAPI_API + "/artist/" + req.params.id + "/top?limit=50",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": process.env.RAPIDAPI_HOST,
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          },
        }
      )
        .then((res) => artist.push(res.data))
        .then(() => res.status(200).send(artist)),
    ]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/albumInfo/:id", isUser, (req, res, next) => {
  try {
    axios(process.env.RAPIDAPI_API + "/album/" + req.params.id, {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    })
      .then((resp) => resp.data)
      .then((obj) => res.status(200).send(obj));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
