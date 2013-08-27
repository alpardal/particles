define('renderers/particle_renderer', [], function() {
    var ParticleRenderer = function(particles) {
        var particleSize = 1;
        var lower = 3.8, upper = 8;

        var getColor = function(velocity) {
            var mag = velocity.getMagnitude();
            var delta = mag <= lower ? 0 : (mag >= upper ? 1 : mag - lower);
            var c = Math.floor(delta * 255);
            var color =  'rgb(' + c + ', ' + c + ', 255)';
            return color;
        };

        var drawParticleAt = function(particle, ctx) {
            var position = particle.position;
            ctx.fillStyle = getColor(particle.velocity);
            ctx.fillRect(position.x, position.y, particleSize, particleSize);
        };

        this.render = function(ctx) {
            for (var i = 0; i < particles.length; i++) {
                drawParticleAt(particles[i], ctx);
            }
        }
    };

    return ParticleRenderer;
});
