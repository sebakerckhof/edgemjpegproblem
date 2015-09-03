var fs = require('fs');
var path = require('path');

var ThumbnailProviderManager = require('./thumbnailProviderManager').ThumbnailProviderManager;
var myThumbnailProviderManager = new ThumbnailProviderManager();
myThumbnailProviderManager.addSource('source1.jpg');
myThumbnailProviderManager.addSource('source2.jpg');
myThumbnailProviderManager.startListening();

// Simulate incoming thumbnails for source1
var i = 0;
function updateMJPG() {
  fs.readFile(__dirname + '\\resources\\'+ i % 25 + '.jpg', sendJPGData1);
  fs.readFile(__dirname + '\\resources\\'+ (25- (i % 25)) + '.jpg', sendJPGData2);
  i++;
}

function sendJPGData1(err, data) {
  if (err) throw err;
  myThumbnailProviderManager.updateSourceThumbnail('source1.jpg', data);
}

function sendJPGData2(err, data) {
  if (err) throw err;
  myThumbnailProviderManager.updateSourceThumbnail('source2.jpg', data);
}

var timer = setInterval(updateMJPG, 2000);