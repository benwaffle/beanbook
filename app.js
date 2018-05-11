const express = require("express");
const bodyParser = require("body-parser");

const bcrypt = require('bcrypt');

const { db } = require('./connection')
const { users, beans, actions } = require('./data');
const app = express();

const auth = require('./middleware')

app.use(require('morgan')('dev'));
app.use(express.static('public'));

app.engine('hbs', require('exphbs'));
app.set('view engine', 'hbs'); // handlebars
app.set('view options', {
  layout: 'main',
  loggedIn: true
});

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
  if (typeof req.session.user === 'string') {
    res.render('beans', {
      beans: await beans.getAllBeans()
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/login', async (req, res) => {
  res.render('login', {title: 'BeanBook — Login', loggedIn: false});
});

app.get('/logout', auth, (req, res) => {
  delete req.session.user;
  res.redirect('/login');
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
    res.render('login', {
      error: 'Invalid username or password',
      loggedIn: false
    });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    res.render('user', {
      actions: await actions.getAllActionsForUser(req.params.id),
      user: await users.getUserById(req.params.id)
    });
  } catch (e) {
    res.redirect('/');
  }
});

app.get("/signup", async (req, res) => {
  res.render("signup", {title: "Sign Up", loggedIn: false});
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  
  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('invalid params for /signup');
  }

  try {
    if (username === '' || password === '')
      throw new Error('empty username or password');
    const passwordHash = await bcrypt.hash(password, 12);
    await users.addUser(username, passwordHash);
    req.session.user = username;
    res.redirect('/');
  } catch (e) {
    res.render('signup', {
      error: e,
      loggedIn: false
    });
  }
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
}).catch((err) => console.log('cannot connect to database', err));
