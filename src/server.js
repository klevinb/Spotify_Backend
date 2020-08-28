const express = require("express");
const port = process.env.PORT;
const UserRoutes = require("./routes/users/index");
const mongoose = require("mongoose");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/users", UserRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dn7fa.mongodb.net/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(
    server.listen(port, () => {
      console.log(`Server runinng port: { ${port} }`);
    })
  )
  .catch((err) => console.log(err));
