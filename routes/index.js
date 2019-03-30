var express = require('express');
var router = express.Router();
var fs=require('fs');
var path=require('path');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pizza42', { title: 'Pizza 42' });
});

// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://wangzz.au.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: 'localhost:3000/pizzaorder', //replace with your API's audience, available at Dashboard > APIs
  issuer: 'https://wangzz.au.auth0.com/',
  algorithms: [ 'RS256' ]
});

router.get('/pizzaorder',checkJwt,function(req,res,next){
  var reqbody=req.body;
  response={"message":"Welcome to order a pizza! This is a secure API!"}
  res.send(JSON.stringify(response));
});

router.get('/pizzaordertest',function(req,res,next){
  response={"message":"Welcome to order a pizza!"}
  res.send(JSON.stringify(response));
});

module.exports = router;
