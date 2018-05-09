// We first require our express package
const express = require("express");
const bodyParser = require("body-parser");

// We create our express instance:
const app = express();

// Tell node where our static content is stored
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.json()); // for parsing application/json
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

// We can now navigate to localhost:3000
app.listen(3000, function() {
  console.log(
    "Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it"
  );
});