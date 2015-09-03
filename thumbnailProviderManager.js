/**
 * Created by PERA on 5jun15.
 */
var express = require('express');
var app = express();

var ThumbnailProvider = require('./thumbnailProvider').ThumbnailProvider;

var ThumbnailProviderManager = exports.ThumbnailProviderManager = function () {
    this._listenPort = 8081;
    this._thumbnailProviderList = [];

    console.log("New ThumbnailProviderManager created.");
};

ThumbnailProviderManager.prototype._addThumbnailProvider = function (path) {
    console.log("ThumbnailProviderManager  : Adding thumbnailProvider ID = " + (path));
    this._thumbnailProviderList.push(new ThumbnailProvider(path));
};

ThumbnailProviderManager.prototype._handleIncomingRequest = function (req, res, path, id) {
    console.log('=== >>  New incoming request for \"' + path + '\", adding a thumbnail handler');
    // The provider we just added is the last element in the list ...
    for (var i=0; i < this._thumbnailProviderList.length; i++)
    {
        if (this._thumbnailProviderList[i].getId() === id){
            this._thumbnailProviderList[i].addThumbnailHandler(req, res);
            break;
        }
    }
}

ThumbnailProviderManager.prototype.addSource = function (path) {
    // Assume there is no thumbnail provider yet for this source:
    this._addThumbnailProvider(path);
    // Now for each request for the given thumbnail (path), create a new handler and add it to the provider
    var requestPath = '/' + path;
    var self = this;
    app.get(requestPath, function (req, res) {
        self._handleIncomingRequest(req, res, path,(path));
    });
};

ThumbnailProviderManager.prototype.updateSourceThumbnail = function (path, data) {
    for (var i=0; i < this._thumbnailProviderList.length; i++)
    {
        if (this._thumbnailProviderList[i].getId() === (path)) {
            this._thumbnailProviderList[i].updateThumbnail(data);
            break;
        }
    }
}

ThumbnailProviderManager.prototype.startListening = function () {
    app.listen(this._listenPort);
    app.use(express.static('client'));
};