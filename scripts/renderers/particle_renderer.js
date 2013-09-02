define([], function() {
    var ParticleRenderer = function(particles) {
        var particleSize = 1;
        var lower = 2, upper = 8;

        var speedRatio = function(velocity) {
            var speed = velocity.length();
            speed = (speed < lower) ? lower : speed;
            speed = (speed > upper) ? upper : speed;
            return (speed - lower) / (upper - lower);
        };

        var getColor = function(particle) {
            var ratio = speedRatio(particle.velocity);
            var c = Math.floor(ratio * 255);
            var color =  'rgb(' + c + ', ' + c + ', 255)';
            return color;
        };

        var drawParticleAt = function(particle, ctx) {
            var position = particle.position;
            ctx.fillStyle = getColor(particle);
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
