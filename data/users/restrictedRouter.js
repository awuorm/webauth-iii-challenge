const express = require("express");
const restricted = require("../auth/restrictedMiddleware");

const db = require("../usersModel");

const router = express.Router();

router.get("/users", restricted, handleAllUsersGet);
router.get("/users/:id", restricted, handleUsersGetById);

function handleUsersGetById(req, res) {
  db.findById(req.params.id, req.decodedToken.roles)
    .then(data => {
      if (data === undefined) {
        res.status(404).json({ errorMessaga: "Please provide a valid ID!" });
      } else {
        res.status(200).json(data);
        console.table(data);
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error });
    });
}

function handleAllUsersGet(req, res) {
  db.find(req.decodedToken.roles)
    .then(data => {
      res.status(200).json(data);
      console.table(data);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error });
    });
}

module.exports = router;
