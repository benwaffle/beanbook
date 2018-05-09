const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(require('morgan')('dev'));
app.use(express.static('/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", async (req, res) => {
    console.log("GET /");
    // res.render("index");
    res.send('ok');
});

app.post("/login", async (req, res) => {
    console.log("POST /login");
});

app.get("/user/:id", async (req, res) => {
    console.log("GET /user/:id");
});

app.get("/signup", async (req, res) => {
    console.log("GET /signup");
});

app.post("/signup", async (req, res) => {
    console.log("POST /signup");
});

app.use("/bean", require("./beanRoutes"));

app.use("*", (req, res) => {
    res.status(404).json({error: "Not found"});
});

app.listen(3000, function() {
  console.log(
    "Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it"
  );
});