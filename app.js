// We first require our express package
const express = require("express");
const bodyParser = require("body-parser");

// We create our express instance:
const app = express();

// Tell node where our static content is stored
const static = express.static(__dirname + "/public");
app.use("/public", static);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", async (req, res) => {
    console.log("GET /");
    res.render("index", {});
});

app.post("/login", async (req, res) => {
    console.log("POST /login");
});

app.get("/user/:id", async (req, res) => {
    console.log("GET /user/:id");
});

app.get("/bean/new", async (req, res) => {
    console.log("GET /bean/new");
});

app.get("/signup", async (req, res) => {
    console.log("GET /signup");
});

app.post("/signup", async (req, res) => {
    console.log("POST /signup");
});

app.get("/bean/:id", async (req, res) => {
    console.log("GET /bean/:id");
});

app.post("/bean", async (req, res) => {
    console.log("POST /bean");
});

app.post("/bean/vote/:rating", async (req, res) => {
    console.log("POST /bean/vote/:rating");
});

app.post("/bean/comments", async (req, res) => {
    console.log("GET /bean/comments");
});

app.put("/bean/:id", async (req, res) => {
    console.log("PUT /bean/:id");
});

app.delete("/bean/:id", async (req, res) => {
    console.log("DELETE /bean/:id");
});

app.post("/search", async (req, res) => {
    console.log("POST /search");
});

app.post("/bean/search", async (req, res) => {
    console.log("POST /bean/search");
});

app.use("*", (req, res) => {
    res.status(404).json({error: "Not found"});
});

// We can now navigate to localhost:3000
app.listen(3000, function() {
  console.log(
    "Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it"
  );
  if (process && process.send) process.send({done: true});
});