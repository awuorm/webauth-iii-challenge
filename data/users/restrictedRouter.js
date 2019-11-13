const express = require("express");
const restricted = require("../auth/restrictedMiddleware");

const db = require("../usersModel");

const router = express.Router();

router.get("/users", restricted, handleAllUsersGet);
router.get("/users/:id", restricted, handleUsersGetById);

function handleUsersGetById(req, res) {
  db.findById(req.params.id)
    .then(data => {
      res.status(200).json(data);
      console.table(data);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error });
    });
}

function handleAllUsersGet(req, res) {
  if (req.decodedToken.roles === "management") {
    db.find()
      .then(data => {
        res.status(200).json(data);
        console.table(data);
      })
      .catch(error => {
        res.status(500).json({ errorMessage: error });
      });
  } else {
    res
      .status(403)
      .json({
        info: "Please reach out to management to access these records!"
      });
  }
}

module.exports = router;
