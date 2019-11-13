const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../usersModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", handleRegistration);
router.post("/login", handleLogin);

function handleLogin(req, res) {
  const { username, password } = req.body;
  db.findBy(username)
    .then(data => {
      if (data && bcrypt.compareSync(password, data.password)) {
        const token = generateToken(data);
        console.log(token);
        res
          .status(200)
          .json({ message: `Welcome ${data.username}`, token: token });
        console.table(data);
      } else {
        res
          .status(401)
          .json({ errorMessage: "Please provide valid credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error });
    });
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  const result = jwt.sign(payload, process.env.SECRET, options);

  return result;
}

// function generateToken(user) {
//     const payload = {
//       subject: user.id,
//       username: user.username,
//       roles: ['student'],
//     }
//     const options = {
//       expiresIn: '1d',
//     }

//     const result = jwt.sign(
//       payload,
//       // process.env.NODE_ENV === 'development' ? 'devsecret' : process.env.SECRET,
//       'THIS IS THE SECRET',
//       options,
//     )

//     return result;
//   }

function handleRegistration(req, res) {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password);
  user.password = hash;
  db.add(user)
    .then(data => {
      res.status(201).json(data);
      console.table(data);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error });
    });
}

module.exports = router;
