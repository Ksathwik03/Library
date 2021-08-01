const express = require("express");
const app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var auth = require("./controllers/auth");
var store = require("./controllers/store");
var User = require("./models/user");
var localStrategy = require("passport-local");
//importing the middleware object to use its functions
var middleware = require("./middleware"); //no need of writing index.js as directory always calls index.js by default
var port = process.env.PORT || 3000;


app.use(express.static("public"));

/*  CONFIGURE WITH PASSPORT */
app.use(
  require("express-session")({
    secret: "decryptionkey", //This is the secret used to sign the session ID cookie.
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize()); //middleware that initialises Passport.
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); //used to authenticate User model with passport
passport.serializeUser(User.serializeUser()); //used to serialize the user for the session
passport.deserializeUser(User.deserializeUser()); // used to deserialize the user

app.use(express.urlencoded({ extended: true })); //parses incoming url encoded data from forms to json objects
app.set("view engine", "ejs");

//THIS MIDDLEWARE ALLOWS US TO ACCESS THE LOGGED IN USER AS currentUser in all views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);

/* TODO: CONNECT MONGOOSE WITH OUR MONGO DB  */
mongoose.connect('mongodb+srv://Ksathwik03:Ksathwik03@cluster0.xtzux.mongodb.net/books?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => { console.log('DATABASE Connected'); })

app.get("/", (req, res) => {
  res.render("index", { title: "Library" });
});

app.use(express.json())
var codeschema = require('./models/book')
app.post('/addCode', async(req, res) => {
  req = req.body
  await new codeschema({ title: req.title,genre: req.genre,
    description: req.description,rating: req.rating,
    mrp: req.mrp,available_copies: req.available_copies,
    author: req.author})
    .save().then(data => res.json(data._id))
})


/*-----------------Store ROUTES
TODO: Your task is to complete below controllers in controllers/store.js
If you need to add any new route add it here and define its controller
controllers folder.
*/

app.get("/books", store.getAllBooks);

app.get("/book/:id", store.getBook);

app.get("/books/loaned",
//middleware.isLoggedIn,
//TODO: call a function from middleware object to check if logged in (use the middleware object imported)
 store.getLoanedBooks);

 app.post("/books/return",
 //middleware.isLoggedIn,
 //TODO: call a function from middleware object to check if logged in (use the middleware object imported)
  store.returnBook);
 
app.post("/books/issue",
middleware.isLoggedIn,
//TODO: call a function from middleware object to check if logged in (use the middleware object imported)
store.issueBook);

app.post("/books/search-book", store.searchBooks);

/* TODO: WRITE VIEW TO RETURN AN ISSUED BOOK YOURSELF */

/*-----------------AUTH ROUTES
TODO: Your task is to complete below controllers in controllers/auth.js
If you need to add any new route add it here and define its controller
controllers folder.
*/

app.get("/login", auth.getLogin);

app.post("/login", auth.postLogin);

app.get("/register", auth.getRegister);

app.post("/register", auth.postRegister);

app.get("/logout", auth.logout);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
