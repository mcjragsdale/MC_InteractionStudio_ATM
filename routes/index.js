var express = require('express');
var router = express.Router();
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATM Example' });
});

/* GET home page. */
router.get('/balanceinquiry', function(req, res, next) {  

var options = { method: 'POST',
  url: 'https://na5.thunderhead.com/one/oauth2token',
  headers: 
   { 'Content-Type': 'application/x-www-form-urlencoded',
     'Postman-Token': 'e4db24b7-3586-407e-b330-bd69d6373d66',
     'Cache-Control': 'no-cache',
     Authorization: 'Basic MzQ0YzAxOWMtMWZhMC00ODU0LTlhMjMtOWNiNmYzYTdmMzNkOjlhZThhMWUwLTg2OWItNDg2Yi1iNzFkLWRkMGM1NGQ3NWFhYQ==' },
  form: { grant_type: 'client_credentials' } };

  request(options, function (error, response, body) {
    if (error){
      throw new Error(error);
    } 

    var json = JSON.parse(body);

    console.log(body);
    var options = { method: 'POST',
  url: 'https://na5.thunderhead.com/one/oauth2/rt/api/3.1.0/customer/ONE-LJBKEO4Y7J-5669/activity',
  headers: 
   { 'Postman-Token': 'f0cc8b2f-f80c-49ba-8b8b-378f04a5ec00',
     'Cache-Control': 'no-cache',
     Authorization: 'Bearer ' + json.access_token,
     'Content-Type': 'application/json' },
  body: 
   { customerContext: 
      { identifiers: 
         [ { apiName: 'customerkey',
             value: 'lauren.salesforcenz@gmail.com' } ],
        properties: [ { name: 'campaigncode', value: 'summeroffer2017' } ],
        device: 
         { appName: 'CustomerFirst',
           appVer: '1.0.2',
           devMfr: 'Apple',
           devModel: 'iPhone8',
           devType: 'SMARTPHONE',
           osName: 'IOS',
           osVer: '10.3.3',
           locLatitude: 61.4,
           locLongitude: 32.7,
           locLastUpdated: '2017-08-24T19:57:34.479-04:00',
           locHorzAccuracy: 1,
           ipAddress: '127.0.0.1',
           locale: 'en-US',
           pushToken: '3220f35e-6255-3701-92a6-d401448e0145' },
        baseTouchpointUri: 'atm://atm' },
     activities: 
      [ { propositionCode: 'atm',
          dynamicPropositionCode: 'atm-12345',
          activityTypeCode: 'balance_inquiry',
          timestamp: '2018-06-02T23:06:19Z' } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});




    res.send({ Balance: '$35,324' });      
  });  
});

module.exports = router;
