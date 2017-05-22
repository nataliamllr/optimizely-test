var express = require('express')
var app = express()
var path = require('path');
var optimizely = require('optimizely-server-sdk');
var crypto = require('crypto');
var fs = require('fs');

var optimizelyClient;

var config = JSON.parse(fs.readFileSync(path.join(__dirname+'/config.json'), 'utf8'));

var defaultLogger = require('optimizely-server-sdk/lib/plugins/logger');

optimizelyClient = optimizely.createInstance({datafile: config, logger: defaultLogger.createLogger(
{
    logLevel: 1
}) 
});

app.get('/', function (req, res) {
var variationKey = optimizelyClient.activate('Segmentation', 'b58970b3f9', {});

var eventTags = {
	'link_location': 'hero-module',
	'variant': variationKey,
	'hp_module_name': 'promoTest'
};

optimizelyClient.track('TEST_EVENT', 'b58970b3f9', {}, eventTags);

console.log("variationKey: ", variationKey);
if (variationKey === 'default') {
  res.sendFile(path.join(__dirname+'/index.html'))
} else if (variationKey === 'variant') {
  res.sendFile(path.join(__dirname+'/index_2.html'))
} else {
  res.sendFile(path.join(__dirname+'/index.html'))
}

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});




