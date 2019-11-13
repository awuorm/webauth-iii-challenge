const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./data/auth/authRouter");
const restrictedRouter = require("./data/users/restrictedRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/auth", authRouter);
server.use("/api/restricted", restrictedRouter);

module.exports = server;
