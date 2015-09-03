

var ThumbnailHandler = require('./thumbnailHandler').ThumbnailHandler;

var ThumbnailProvider = exports.ThumbnailProvider = function (id) {
    this._id = id;
    this._isActive = true;
    this._thumbnailHandlerList = [];
    this._thumbNailData;
    console.log("New ThumbnailProvider created. ID = " + this._id);
};

ThumbnailProvider.prototype.getId = function () {
    return this._id;
};

ThumbnailProvider.prototype.getNumberOfThumnailHandlers = function () {
    return this._thumbnailHandlerList.length;
};

ThumbnailProvider.prototype.addThumbnailHandler = function (req, res) {
    console.log("ThumbnailProvider ID = " + this._id + " : Adding thumbnailHandler ID = " + this._thumbnailHandlerList.length);
    this._thumbnailHandlerList.push(new ThumbnailHandler((this._id + '_' + this._thumbnailHandlerList.length), req, res));
};

ThumbnailProvider.prototype._sendThumbnail = function () {
    if (this._thumbnailHandlerList.length === 0){
        console.log('No subscribed requesters for provider ' + this._id);
        return;
    }
    for (var i = 0; i < this._thumbnailHandlerList.length; i++){
        this._thumbnailHandlerList[i].sendThumbnail(this._thumbNailData);
    }
   
}

ThumbnailProvider.prototype.updateThumbnail = function (data) {
    console.log("ThumbnailProvider ID = " + this._id + " Received new thumbnail data");
    this._thumbNailData = data;
    // Restart the timer
    this._sendThumbnail();
};