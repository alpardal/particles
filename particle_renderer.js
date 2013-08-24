ParticleRenderer = function(particles) {
    var particleSize = 1;

    this.render = function(ctx) {
        ctx.fillStyle = 'rgb(0, 0, 255)';
        for (var i = 0; i < particles.length; i++) {
            var pos = particles[i].position;
            ctx.fillRect(pos.x, pos.y, particleSize, particleSize);
        }
    }
}
