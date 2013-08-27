define('world',
       ['vector', 'rectangle', 'world_renderer', 'field'],
       function(Vector, Rectangle, WorldRenderer, Field) {

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

        this.addFieldAt = function(x, y, mass) {
            var field = new Field(new Vector(x, y), mass);
            fields.push(field);
        };

        this.update = function() {
            addNewParticles();
            particles = moveParticles(particles, fields, bounds);
        };

        this.draw = function(ctx) {
            new WorldRenderer(particles, fields).render(ctx);
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
