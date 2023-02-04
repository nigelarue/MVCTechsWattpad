const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/config");
const { Console } = require("console");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "I1got2a3baseball4bat5beside6my7bed8To9fight10off1what2inside3my4head5To6fight7off8whats9behind0my0meds",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
});

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Turn on routes
app.use(require("./controllers"));

// Turn on connection to db and server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});