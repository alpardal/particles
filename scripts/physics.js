define('physics', [], function() {

    var Physics = function(maxParticles, bounds) {

        var emitParticles = function(emitters) {
            var particles = [];
            for (var e = 0; e < emitters.length; e++) {
                var newParticles = emitters[e].emitParticles();
                Array.prototype.push.apply(particles, newParticles);
            }
            return particles;
        };

        var moveParticles = function(particles, fields, bounds) {
            var newParticles = [];

            for (var i = 0; i < particles.length; i++) {
                var particle = particles[i];

                if (particle.isAlive && bounds.contains(particle.position)) {
                    particle.interactWith(fields)
                    particle.move();
                    newParticles.push(particle);
                }
            }
            return newParticles;
        };

        this.updateParticles = function(particles, fields, emitters) {
            if (particles.length < maxParticles) {
                var emittedParticles = emitParticles(emitters);
                Array.prototype.push.apply(particles, emittedParticles);
            }

            return moveParticles(particles, fields, bounds);
        };
    };

    return Physics;
});
