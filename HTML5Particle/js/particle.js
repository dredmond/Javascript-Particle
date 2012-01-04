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

Vector.prototype.distance = function(vector) {
    var x = this.x - vector.x;
    var y = this.y - vector.y;

    return Math.sqrt(x * x + y * y);
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


function Particle(x, y, maxSpeed, ptype) {
    var location = new Vector();
    var velocity = new Vector();
    location.set(x, y);
    var gravity = 2000;
    var maxLife = 100;
    var acceleration = new Vector();
    var _maxSpeed = maxSpeed;

    // Get randomized acceleration values.
    acceleration.x = (Math.random() * (500)) - 250;
    acceleration.y = (Math.random() * (500)) - 250;
    
    this.type = ptype;
    var energy = 10;

    this.debug = function () {
        return 'Loc: ' + location.x + ', ' + location.y;
    };

    this.update = function (delta) {
        if (this.type != particleType.Hair)
            energy -= 10 * delta;

        var tmpAcceleration = new Vector();
        tmpAcceleration.copy(acceleration);
        tmpAcceleration.mult(delta);
        velocity.add(tmpAcceleration);

        // Force velocities to stay at max speed.
        if (velocity.x > 0 && velocity.x > _maxSpeed) velocity.x = _maxSpeed;
        if (velocity.x < 0 && velocity.x < -_maxSpeed) velocity.x = -_maxSpeed;
        if (velocity.y > 0 && velocity.y > _maxSpeed) velocity.y = _maxSpeed;
        if (velocity.y < 0 && velocity.y < -_maxSpeed) velocity.y = -_maxSpeed;

        // Copy the velocity vector and apply the delta.
        var tempVelocity = new Vector();
        tempVelocity.copy(velocity);
        tempVelocity.mult(delta);

        // Add new velocity to the current location of the particle.
        location.add(tempVelocity);

        // Apply gravity.
        velocity.y -= gravity * delta;
    };

    this.draw = function (ctx, img) {
        var alpha = (energy / maxLife).toFixed(2);
        ctx.fillStyle = 'rgba(255, 0, 0, ' + alpha + ')';
        ctx.save();
        ctx.beginPath();
        ctx.arc(location.x, location.y, 8, 0, Math.PI * 2, true);
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