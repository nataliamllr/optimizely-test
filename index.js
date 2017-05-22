var express = require('express')
var app = express()
var path = require('path');
var optimizely = require('optimizely-server-sdk');
var crypto = require('crypto');
var fs = require('fs');

var optimizelyClient;

var config = JSON.parse(fs.readFileSync(path.join(__dirname+'/config.json'), 'utf8'));

optimizelyClient = optimizely.createInstance({datafile: config})


app.get('/', function (req, res) {
var variationKey = optimizelyClient.activate("invalid_key", 'user123');
console.log("variationKey: ", variationKey);
if (variationKey === 'default') {
  res.sendFile(path.join(__dirname+'/index.html'))
} else if (variationKey === 'bucket_b') {
  res.sendFile(path.join(__dirname+'/index_2.html'))
} else {
  res.sendFile(path.join(__dirname+'/index.html'))
}

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});




