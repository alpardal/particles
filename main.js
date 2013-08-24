(function() {
    var canvas = new ParticleCanvas('#particles-canvas');
    var particles = [];

    var maxParticles = 4000;
    var emitters = [new Emitter(new Vector(canvas.width/8, canvas.height*7/8),
                                Vector.fromAngle(-Math.PI/8, 2)),
                    new Emitter(new Vector(canvas.width/8, canvas.height/8),
                                Vector.fromAngle(Math.PI/8, 2))];


    var addNewParticles = function() {
        if (particles.length < maxParticles) {
            for (var i = 0; i < emitters.length; i++) {
                emitters[i].addParticles(particles);
            }
        }
    };

    var moveParticles = function(particles, canvas) {
        var newParticles = [];

        for (var i = 0; i < particles.length; i++) {
            var particle = particles[i];
            var pos = particle.position;

            if (canvas.bounds.contains(pos)) {
                particle.move();
                newParticles.push(particle);
            }
        }

        return newParticles;
    };

    canvas.update = function() {
        addNewParticles();
        particles = moveParticles(particles, canvas);
    };

    canvas.draw = function(ctx) {
        var renderer = new ParticleRenderer(particles);
        renderer.render(ctx);
    }

    canvas.loop();

})();
