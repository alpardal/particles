define(['vector', 'particle', 'circle'], function(Vector, Particle, Circle) {
    var Emitter = function(position, velocity, spread) {
        this.position = position;
        this.velocity = velocity;
        this.spread = spread || Math.PI/8 * Math.random();
        this.drawColor = '#999';
        this.emissionRate = 8 * Math.random();
        this.radius = 40;
    };

    Emitter.prototype = Object.create(Circle.prototype);

    Emitter.prototype.setSpread = function(spread) {
        spread = (spread < 0) ? 0 : spread;
        spread = (spread > Math.PI*2) ? Math.PI*2 : spread;
        this.spread = spread;
    };

    Emitter.prototype.emitParticle = function() {
        var angle = this.velocity.getAngle() +
                      this.spread - (Math.random() * this.spread * 2);
        var length = this.velocity.length();
        var position = this.position.copy();
        var velocity = Vector.fromAngle(angle, length);
        return new Particle(position, velocity);
    };

    Emitter.prototype.emitParticles = function() {
        var particles = [];
        for (var j = 0; j < this.emissionRate; j++) {
            particles.push(this.emitParticle());
        }
        return particles;
    };
    return Emitter;
});
