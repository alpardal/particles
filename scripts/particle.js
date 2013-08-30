define('particle', ['vector'], function(Vector) {
    var Particle = function(position, velocity, acceleration) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration || new Vector();
        this.isAlive = true;
    };

    Particle.prototype.move = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        return this;
    };

    return Particle;
});
