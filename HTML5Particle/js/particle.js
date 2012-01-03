// Particle Types (This will be used later)
var particleType = { Smoke: 0, Fire: 1, Hair: 2 };

// Define our vector and it's operations
function Vector () {
    this.x = 0;
    this.y = 0;

    this.add = function (vector) {
        if (vector && vector.constructor !== Vector)
            return;
        
        this.x += vector.x;
        this.y += vector.y;
    };

    this.mult = function(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    };
}

function Particle (ptype) {
    var location = new Vector();
    var velocity = new Vector();
    
    velocity.x = (Math.random() * 10) - 1;
    velocity.y = (Math.random() * 10) - 1;
    
    this.type = ptype;
    var energy = 100;

    // Set the current location of the particle
    this.setLocation = function (x, y) {
        location.x = x;
        location.y = y;
    };

    this.debug = function () {
        return 'Loc: ' + location.x + ', ' + location.y;
    };

    this.update = function (delta) {
        energy -= 1 * delta;
        velocity.mult(delta);
        location.add(velocity);
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