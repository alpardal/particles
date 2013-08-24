Particle = function(position, velocity, acceleration) {
    this.position = position || new Vector();
    this.velocity = velocity || new Vector();
    this.acceleration = acceleration || new Vector();
}

Particle.prototype.move = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    return this;
}
