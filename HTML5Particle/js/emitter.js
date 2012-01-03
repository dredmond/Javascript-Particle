function Emitter () {
    var particles = [];
    var image = null;
    var lastFrameTime = 0;

    this.init = function (img) {
        for (var i = 0; i < 100; i++) {
            var x = Math.random() * 801;
            var y = Math.random() * 601;

            var p = new Particle();
            p.setLocation(x, y);
            particles.push(p);
        }

        lastFrameTime = new Date().getTime();
    };

    this.update = function () {
        var currentFrameTime = new Date().getTime();
        var i, x, y;

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
                particles[i] = new Particle();
                x = Math.random() * 801;
                y = Math.random() * 601;
                particles[i].setLocation(x, y);
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