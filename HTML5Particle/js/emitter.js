function Emitter (x, y, minSpeed, maxSpeed, maxParticles) {
    var particles = [];
    var image = null;
    var lastFrameTime = 0;
    var location = new Vector();
    var _minSpeed = minSpeed;
    var _maxSpeed = maxSpeed;
    var _maxParticles = maxParticles;
    location.set(x, y);

    this.init = function (img) {
        for (var i = 0; i < _maxParticles; i++) {
            var p = new Particle(location.x, location.y, _minSpeed, _maxSpeed, particleType.Smoke);
            particles.push(p);
        }

        lastFrameTime = new Date().getTime();
    };

    this.update = function () {
        var currentFrameTime = new Date().getTime();
        var i;

        if (lastFrameTime == 0) {
            lastFrameTime = currentFrameTime;
        }

        var delta = (currentFrameTime - lastFrameTime) / 1000;
        
        if (delta <= 0)
            return;
        
        lastFrameTime = new Date().getTime();

        for (i = particles.length - 1; i >= 0; i--) {
            particles[i].update(delta);

            if (particles[i].dead()) {

                // Create new particle.
                particles[i] = new Particle(location.x, location.y, _minSpeed, _maxSpeed, particleType.Smoke);
            }
        }
    };

    this.draw = function (ctx) {
        for (var i in particles) {
            particles[i].draw(ctx, image);
        }
    };

    this.done = function() {
        if (particles.length == 0) {
            return true;
        }

        return false;
    };
};