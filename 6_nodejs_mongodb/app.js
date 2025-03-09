const express = require("express");
const tourRouter = require("./routes/tourRoutes.js");
const morgan = require("morgan");

const app = express();

//gelen istekleri loglar
app.use(morgan("dev"));

//gelen isteklerinin bodysine eiş
app.use(express.json());

//turlar ile alakalı yolları projeye tanıt
app.use(tourRouter);

module.exports = app;
