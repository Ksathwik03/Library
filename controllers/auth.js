User = require("../models/user");
const passport = require('passport');

var getLogin = (req, res) => {
  //TODO: render login page
  res.render("login", { title: "Login",message: ''});
};

var postLogin = (req, res) => {
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.render('login',{title:'Login',message:`${err}`}) }
    if (!user) { return res.render('login',{title:'Login',message:'Invalid username or password'}); }
    req.logIn(user, function(err) {
      if (err) { return res.render('login',{title:'Login',message:`${err}`}) }
      passport.authenticate("local")(req,res, () => {
        res.redirect('/');
      })
    });
  })(req, res);

};

var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logout()
  res.redirect("/")
};

var getRegister = (req, res) => {
  // TODO: render register page
  res.render("register", { title: "Register" , message:''});
};


var postRegister = async(req, res) => {
  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
  Users=new User({username : req.body.username});
  
  User.register(Users, req.body.password, function(err, user) {
    if (err) {
     return res.render('register',{title:'Register', message:`Your account could not be saved. Error: ${err}`}) 
    }else{
      passport.authenticate("local")(req,res, () => {
        res.redirect('/');
      })  
    }
  });
}

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
