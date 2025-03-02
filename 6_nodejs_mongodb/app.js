const express = require("express");

const app = express();

app.get("/api/tours", (req, res) => {
  res.status(200).json("Veriden cevap geldi");
});

module.exports = app;
