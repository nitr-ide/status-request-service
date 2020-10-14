const app = require("express")();
const mongoose = require("mongoose");
const cors = require("cors");
const Request = require("./request.model");

const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`status   |   ${req.method} ${req.query.taskID}`);
  next();
});

app.get("/status", (req, res) => {
  console.log("Searching for", req.query.taskID);

  Request.findOne({ id: req.query.taskID })
    .then((doc) => {
      console.log(doc['id'], doc['status']);
      res.status(200);
      res.send(doc);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

mongoose
  .connect("mongodb://localhost:27017/ide", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("status   |   successfully connected to mongodb!");
  })
  .catch((err) => {
    throw err;
  });

app.listen("5100", () => {
  console.log("status   |   listening on port 5100");
});
