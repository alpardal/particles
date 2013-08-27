define('world',
       ['vector', 'rectangle', 'particle_renderer'],
       function(Vector, Rectangle, ParticleRenderer) {

    var World = function(width, height) {
        var maxParticles = 10000;
        var emitters = [];
        var fields = [];
        var particles = [];
        var bounds = new Rectangle(Vector.ORIGIN, width, height);

        this.width = width;
        this.height = height;

        this.addEmitter = function(emitter) {
            emitters.push(emitter);
        };

        this.addField = function(field) {
            fields.push(field);
        }

        this.update = function() {
            addNewParticles();
            particles = moveParticles(particles, fields, bounds);
        };

        this.draw = function(ctx) {
            new ParticleRenderer(particles).render(ctx);
            drawFields(ctx);
        };

        var drawFields = function(ctx) {
            for (var i = 0; i < fields.length; i++) {
                fields[i].draw(ctx);
            }
        };

        var addNewParticles = function() {
            if (particles.length < maxParticles) {
                for (var i = 0; i < emitters.length; i++) {
                    var newParticles = emitters[i].emitParticles();
                    Array.prototype.push.apply(particles, newParticles);
                }
            }
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
    };

    return World;
});
