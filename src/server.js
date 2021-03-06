const express = require('express');
const port = process.env.PORT;
const UserRoutes = require('./routes/users');
const DeezerRoutes = require('./routes/deezer');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const server = express();

const whitelist = [process.env.DEV, process.env.PRO];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

server.use(cors(corsOptions));

server.use(cookieParser());
server.use(express.json());

server.use('/users', UserRoutes);
server.use('/deezer', DeezerRoutes);

mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log(`Server runinng port: { ${port} }`);
    })
  )
  .catch((err) => console.log(err));
