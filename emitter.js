Emitter = function(position, velocity, spread) {
    this.position = position;
    this.velocity = velocity;
    this.spread = spread || Math.PI/16;
    this.drawColor = '#999';
}

Emitter.prototype.emitParticle = function() {
    var angle = this.velocity.getAngle() +
                  this.spread - (Math.random() * this.spread * 2);
    var magnitude = this.velocity.getMagnitude();
    var position = this.position.copy();
    var velocity = Vector.fromAngle(angle, magnitude);
    return new Particle(position, velocity);
}