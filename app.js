const express = require("express");
const bodyParser = require("body-parser");

const bcrypt = require('bcrypt');

const { db } = require('./connection')
const { users } = require('./data');
const app = express();

app.use(require('morgan')('dev'));
app.use(express.static('/public'));

app.set('view engine', 'hbs'); // handlebars

app.use(require('express-session')({
  secret: 'kitten',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get("/", async (req, res) => {
  console.log("GET /");
  // res.render("index");
  res.send('ok');
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('invalid params for /login');
  }
  
  try {
    const user = await users.getUserById(username);
    
    if (await bcrypt.compare(password, user.passwordHash)) {
      req.session.user = user._id;
      
      res.redirect('/');
    } else {
      throw 'bad';
    }
  } catch (e) {
    res.render('/', {
      error: 'Invalid username or password'
    });
  }
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

db.then(() => {
  app.listen(3000, function() {
    console.log(
      "Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it"
    );
  });
});