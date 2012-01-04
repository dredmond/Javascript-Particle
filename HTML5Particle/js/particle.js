// Particle Types (This will be used later)
var particleType = { Smoke: 0, Fire: 1, Hair: 2 };

// Define our vector and it's operations
function Vector () {
    this.x = 0;
    this.y = 0;
};

Vector.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype.copy = function(vector) {
    this.x = vector.x;
    this.y = vector.y;
};

Vector.prototype.add = function (vector) {
    if (vector && vector.constructor !== Vector)
        return;

    this.x += vector.x;
    this.y += vector.y;
};

Vector.prototype.mult = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
};

Vector.prototype.sub = function (vector) {
    this.x -= vector.x;
    this.y -= vector.y;
};

Vector.prototype.dot = function (vector) {
    return this.x * vector.x + this.y + vector.y;
};

Vector.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.normalize = function () {
    var s = 1 / this.length();
    this.mult(s);
};


function Particle(x, y, minSpeed, maxSpeed, ptype) {
    var location = new Vector();
    location.set(x, y);

    // Max speed actually needs to have the absolute value of minSpeed added to 
    // it in order to compensate for the way random values are calculated.
    maxSpeed += Math.abs(minSpeed);

    var velocity = new Vector();
    velocity.x = (Math.random() * (maxSpeed + 1)) + minSpeed;
    velocity.y = (Math.random() * (maxSpeed + 1)) + minSpeed;
    
    this.type = ptype;
    var energy = 100;

    this.debug = function () {
        return 'Loc: ' + location.x + ', ' + location.y;
    };

    this.update = function (delta) {
        energy -= 1;
        
        var tempVelocity = new Vector();
        tempVelocity.copy(velocity);
        
        tempVelocity.mult(delta);
        location.add(tempVelocity);
    };

    this.draw = function (ctx, img) {
        var alpha = energy / 100;
        ctx.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
        ctx.save();
        ctx.beginPath();
        ctx.arc(location.x, location.y, 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };

    this.dead = function() {
        if (energy > 0) {
            return false;
        }

        return true;
    };
};