require("dotenv").config();

const express = require('express');
const app = express();


const PORT = 8000;

require("./config/db.config")
const router = require('./config/routes.config');

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});