const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req, res, next){

  //User has already had their email and password auth'd
  // We just need to give them a token.
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).send({ error: 'You should check the email or password'})
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser){
    if(err) { return next(err);}

    //If a user with email does exist, return an error
    if(existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }

    //If a user with email does NOT exist, create and save user recoder
    const user = new User({
      email: email,
      password: password
    })

    user.save(function(err) {
      if(err) { return next(err);}

      //Repond to request indicating the user was created.
      return res.status(200).send({success: 'true', token: tokenForUser(user)})
    });
  })
}