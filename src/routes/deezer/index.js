const express = require("express");
const axios = require("axios");
const { isUser } = require("../../utilities/middleware");

const router = express.Router();

router.get("/artitisInfo/:id", isUser, (req, res, next) => {
  try {
    console.log("HERE");
    let artist = [];
    Promise.all([
      axios(
        "https://deezerdevs-deezer.p.rapidapi.com/artist/" + req.params.id,
        {
          method: "get",
          headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":
              "b0688e745dmsh41b788a14af44c3p1bd80cjsn95f97f3e6443",
          },
        }
      ).then((res) => artist.push(res.data)),

      axios(
        "https://deezerdevs-deezer.p.rapidapi.com/artist/" +
          req.params.id +
          "/top?limit=50",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":
              "b0688e745dmsh41b788a14af44c3p1bd80cjsn95f97f3e6443",
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

module.exports = router;
