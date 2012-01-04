function Emitter (x, y, maxSpeed, maxParticles) {
    var particles = [];
    var image = null;
    var lastFrameTime = 0;
    var location = new Vector();
    var _maxSpeed = maxSpeed;
    var _maxParticles = maxParticles;
    var _emitInterval = 0;
    var _lastEmit = 0;
    location.set(x, y);

    this.init = function (img) {
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

        _lastEmit += delta * 2;

        if (particles.length < _maxParticles && _lastEmit > _emitInterval) {
            var p = new Particle(location.x, location.y, _maxSpeed, particleType.Smoke);
            particles.push(p);
            _lastEmit = 0;
        }

        for (i = particles.length - 1; i >= 0; i--) {
            particles[i].update(delta);

            if (particles[i].dead()) {
                particles.splice(i, 1);
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