const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

const pdfTemplate = require("./documents");

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({
    success: "success",
  });
});
//POST ROUTE PDF GEN
app.post("/create-pdf", (req, res) => {
  console.log(req.body);
  const { name, email, address, address2, city, state, zip } = req.body;
  pdf
    .create(pdfTemplate(name, email, address, address2, city, state, zip), {})
    .toFile("dynamicPDF.pdf", (err) => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
});

//GET SEND GENERATED PDF
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/dynamicPDF.pdf`);
});

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON ${port}`);
});
