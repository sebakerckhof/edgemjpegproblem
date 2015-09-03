var ThumbnailHandler = exports.ThumbnailHandler = function (id, req, res) {

    this._id = id;
    this._req = req;
    this._res = res;
    this._res.writeHead(200,{
        'Content-Type': 'multipart/x-mixed-replace;boundary=--boundary',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    this._res.write("--boundary\r\n");

    console.log("New ThumbnailHandler created. ID = " + this._id);

};

ThumbnailHandler.prototype.getId = function () {
    return this._id;
}

ThumbnailHandler.prototype.isActive = function () {
    return this._isActive;
}

ThumbnailHandler.prototype.sendThumbnail = function (jpeg) {
    this._res.write("Content-Type: image/jpeg\r\n");
    this._res.write("Content-Length: " + jpeg.length + "\r\n");
    this._res.write("\r\n");
    this._res.write(jpeg, 'binary');
    this._res.write("\r\n");
    this._res.write("--boundary\r\n");
};

ThumbnailHandler.prototype.close = function () {
    console.log("ThumbnailHandler ID = " + this._id + " : Closing and stopping activity.");
    this._isActive = false;
    clearInterval(this._aliveTimer);
    this._res.end();
    delete this._res;
    delete this._req;
    delete this._id;
    delete this._aliveTimer;
}