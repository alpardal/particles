ParticleRenderer = function(particles) {
    var particleSize = 1;

    var drawParticleAt = function(position, ctx) {
        ctx.fillRect(position.x, position.y, particleSize, particleSize);
    };

    this.render = function(ctx) {
        ctx.fillStyle = 'rgb(0, 0, 255)';
        for (var i = 0; i < particles.length; i++) {
            drawParticleAt(particles[i].position, ctx);
        }
    }
}
