times = 0;
define('physics', ['vector'], function(Vector) {

    var Physics = function(maxParticles, bounds) {

        this.updateParticles = function(particles, fields, emitters) {
            if (particles.length < maxParticles) {
                var emittedParticles = emitParticles(emitters);
                Array.prototype.push.apply(particles, emittedParticles);
            }

            return moveParticles(particles, fields, bounds);
        };

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
                    applyFieldsToParticle(fields, particle);
                    particle.move();
                    newParticles.push(particle);
                }
            }
            return newParticles;
        };

        var applyFieldsToParticle = function(fields, particle) {
            var resultingForce = new Vector();

            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];

                if (field.contains(particle.position)) {
                    particle.isAlive = false;
                    break;
                }

                var posDelta = field.position.copy().subtract(particle.position);
                var distance = posDelta.length();
                var forceModule = field.mass / Math.pow(distance, 2);
                var forceDir = posDelta.normalize();
                var force = forceDir.scale(forceModule);
                resultingForce.add(force);
            }

            particle.acceleration = resultingForce;
        };

    };

    return Physics;
});
