
function Model(width, height) {
  if (height === undefined)
    height = width;

  this.width = width;
  this.height = height;

  this.reset();
}

Model.prototype.getController = function() {
  return {
    move: this.move.bind(this),
    distance: this.distance.bind(this)
  };
};

Model.prototype.reset = function() {
  this.setTargetPositionRandomly();
  this.setProphetPositionRandomly();
};

Model.prototype.setProphetPositionRandomly = function() {
  var p = this.randomPoint();
  this.setProphetPosition(p);
};

Model.prototype.setTargetPositionRandomly = function() {
  var p = this.randomPoint();
  this.setTargetPosition(p);
};

Model.prototype.setProphetPosition = function(p) {
  if (p.x < 0 || p.x > this.width ||
    p.y < 0 || p.y > this.height)
    throw new Error('Invalid position');

  this.p = p;
};

Model.prototype.setTargetPosition = function(p) {
  if (p.x < 0 || p.x > this.width ||
    p.y < 0 || p.y > this.height)
    throw new Error('Invalid position');

  this.t = p;
};

Model.prototype.randomPoint = function() {
  var randomUpTo = function(max) { return Math.floor(Math.random() * max); };
  return {
    x: randomUpTo(this.width),
    y: randomUpTo(this.height)
  };
};

Model.prototype.move = function(direction) {

  direction = direction.toLowerCase();

  if (direction === 'up') {
    if (this.p.y < this.height)
      ++this.p.y;
  } else if (direction === 'down') {
    if (this.p.y > 0)
      --this.p.y;
  } else if (direction === 'right') {
    if (this.p.x < this.width)
      ++this.p.x;
  } else if (direction === 'left') {
    if (this.p.x > 0)
      --this.p.x;
  } else {
    throw new Error('Invalid direction');
  }
};

Model.prototype.distance = function() {
  
  var dX = Math.abs(this.p.x - this.t.x);
  var dY = Math.abs(this.p.y - this.t.y);
  var distance = Math.sqrt(dX*dX + dY*dY);

  return distance;
};