var express = require('express');
var router = express.Router();
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATM Example' });
});

/* GET home page. */
router.get('/balanceinquiry', function(req, res, next) {  


  var ci = '344c019c-1fa0-4854-9a23-9cb6f3a7f33d'; //postman.getEnvironmentVariable('isClientId');
  var cs = '9ae8a1e0-869b-486b-b71d-dd0c54d75aaa'; //postman.getEnvironmentVariable('isClientSecret');
  var cics = ci + ":" + cs;
  let buff = new Buffer(cics);  
  let base64data = buff.toString('base64');
  
  var options = { method: 'POST',
    url: 'https://na5.thunderhead.com/one/oauth2token',
    headers: 
      { 'Content-Type': 'application/x-www-form-urlencoded',
        'Postman-Token': 'e4db24b7-3586-407e-b330-bd69d6373d66',
        'Cache-Control': 'no-cache',
        Authorization: 'Basic ' + base64data },     
    form: { grant_type: 'client_credentials' } 
  };

  request(options, function (error, response, tokenBody) {
    if (error){
      throw new Error(error);
    } 
    var tokenData = JSON.parse(tokenBody);
    var options2 = { method: 'POST',
      url: 'https://na5.thunderhead.com/one/oauth2/rt/api/2.0/interaction',
      qs: { sk: 'ONE-LJBKEO4Y7J-5669' },
      headers: 
      { 'Postman-Token': 'f4e190b4-49c2-4e6e-9c0c-038d1a44a474',
        'Cache-Control': 'no-cache',
        Authorization: 'Bearer ' + tokenData.access_token,
        'Content-Type': 'application/json' },
      body: 
      { customerKey: 'lauren.salesforcenz@gmail.com',
        uri: 'atm://atm/offer',
        properties: [ { name: 'action', value: 'balanceInquiry' } ] },
      json: true 
    };


    request(options2, function (error, response, interactionBody) {
      
      if (error){
        throw new Error(error);
      } 

      var d = new Buffer(interactionBody.optimizations[0].data, 'base64').toString('ascii')


      res.send({ 
        Body: d,  
        Balance: '$35,324' 
      });

      console.log(interactionBody);
    });    
  });
});
module.exports = router;
