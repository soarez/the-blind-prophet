function setupTrigger(obj, methodName, callback, context) {
  var method = obj[methodName];
  obj[methodName] = function() {
    var res = method.apply(obj, arguments);
    callback.call(context, {arg: arguments, res: res});
    return res;
  };
}

function Viewer(model, width, height) {
  
  this.model = model;

  if (height === undefined)
    height = width;

  this.el = document.createElement('canvas');
  this.el.width = width;
  this.el.height = height;
  this.ctx = this.el.getContext('2d');

  var defaultSize = Math.min(this.el.width, this.el.height) / 100;

  // settings
  this.prophetColor = '55F';
  this.prophetSize = defaultSize/1.2;
  this.targetColor = '393';
  this.targetSize = defaultSize;
  this.trailColor = 'AAF';
  this.trailSize = defaultSize;

  this.drawTarget();

  setupTrigger(model, 'move', this.update, this);
  setupTrigger(model, 'reset', this.clear, this);
}

Viewer.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.el.width, this.el.height);
};

Viewer.prototype.drawCircle = function(p, radius) {
  this.ctx.beginPath();
  this.ctx.arc(p.x, p.y, radius, Math.PI*2, 0);
  this.ctx.fill();
};

Viewer.prototype.project = function(p) {

  var rx = this.el.width / this.model.width;
  var ry = this.el.height / this.model.height;
  
  return {
    x: p.x * rx,
    y: this.el.height - p.y * ry
  };
};

Viewer.prototype.drawProphet = function() {
  var fillStyle = this.ctx.fillStyle;
  this.ctx.fillStyle = this.prophetColor;

  var p = this.project(this.model.p);
  this.drawCircle(p, this.prophetSize);

  this.ctx.fillStyle = fillStyle;
};

Viewer.prototype.drawTrail = function() {
  
  if (this.o !== undefined) {
    var fillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = this.trailColor;

    var p = this.project(this.o);
    this.drawCircle(p, this.trailSize);

    this.ctx.fillStyle = fillStyle;
  }

  this.o = {
    x: this.model.p.x,
    y: this.model.p.y
  };
};

Viewer.prototype.drawTarget = function() {
  var fillStyle = this.ctx.fillStyle;
  this.ctx.fillStyle = this.targetColor;

  var p = this.project(this.model.t);
  this.drawCircle(p, this.targetSize);

  this.ctx.fillStyle = fillStyle;
};

Viewer.prototype.update = function() {
  this.drawTrail();
  this.drawTarget();
  this.drawProphet();
};
