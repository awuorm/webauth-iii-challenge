const server = require("./server");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

server.get("*", (req, res) => {
  res.status(200).json("Hello from Authentication server!");
});

server.listen(port, () => {
  console.log("listening on port", port);
});
