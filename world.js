World = function(bounds) {
    var maxParticles = 4000;
    var emitters = [];
    var particles = [];

    this.addEmitter = function(emitter) {
        emitters.push(emitter);
    };

    this.updateParticles = function() {
        addNewParticles();
        particles = moveParticles(particles, bounds);
    };

    this.drawParticles = function(ctx) {
        var renderer = new ParticleRenderer(particles);
        renderer.render(ctx);
    };

    var addNewParticles = function() {
        if (particles.length < maxParticles) {
            for (var i = 0; i < emitters.length; i++) {
                emitters[i].addParticles(particles);
            }
        }
    };
    var moveParticles = function(particles, bounds) {
        var newParticles = [];

        for (var i = 0; i < particles.length; i++) {
            var particle = particles[i];

            if (bounds.contains(particle.position)) {
                particle.move();
                newParticles.push(particle);
            }
        }
        return newParticles;
    };
};
