function Particle () {
    var location = { x: 0, y: 0 };
    var direction = { x: 0, y: 0 };
    var energy = 100;

    // Set the current location of the particle
    this.setLocation = function (x, y) {
        location.x = x;
        location.y = y;
    };

    this.debug = function () {
        return location.x + ', ' + location.y;
    };

    this.update = function() {

    };

    this.draw = function(canvas, img) {
        
    };
};