const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Server is up and running!");
});


