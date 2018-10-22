var superTest = require('supertest');
var should = require('chai').should(),
    expect = require('chai').expect;
var assert = require('assert');
var testUtil = require("./../test-utilities");
var varTestUtil = new testUtil.TestUtil();
var app_env = process.env.APP_ENV.toLowerCase();
var envURL = varTestUtil.getEnvURL();
var reqPath = varTestUtil.getApplicationRequestPath();
var dataPath = varTestUtil.getApplicationDataPath();
var api = superTest(envURL);
var addContext = require('mochawesome/addContext')
var request= null;
var response= null;

describe ('TestSuite one', function(){
var sumissionid = null;
it('Testcase1- Testing the get request', function(done)
{
api.get(reqPath)
	.expect(200)
	.end(function(err, res) {
	console.log(res.body)
	response = JSON.stringify(res.body);
        done();       
      });

});

it('Testcase2- Testing the post request', function()
{
var ApplicationReq = require(dataPath + '/test-post-request.json');
var ApplicationRes = require(dataPath + '/test-post-response.json');
return api.post('/Address')
	.send(ApplicationReq)	
	 .expect(200)
	.then(function(resp) {         
           console.log(resp.body);
           varTestUtil.verifyResponse(resp.body, ApplicationRes ),
           assert.equal(resp.status,200)
           response = JSON.stringify(resp.body);
           request =ApplicationReq;
         });
});

 afterEach(function() {

      addContext(
      this, {
      title: 'Request is',
      value: request}
    );

      addContext(
      this, {
      title: 'Response is',
      value: response}
    );


  });

});



