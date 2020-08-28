const express = require("express");
const port = process.env.PORT;

const server = express();

server.use(express.json());

server.listen(port, () => {
  console.log(`Server runinng port: { ${port} }`);
});
