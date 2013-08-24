Particle = function(position, velocity, acceleration) {
    this.position = position || new Vector();
    this.velocity = velocity || new Vector();
    this.acceleration = acceleration || new Vector();
};

Particle.prototype.move = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    return this;
};

Particle.prototype.interactWith = function(fields) {
    var ax = 0, ay = 0;

    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var vx = field.position.x - this.position.x;
        var vy = field.position.y - this.position.y;

        var force = field.mass / Math.pow(vx*vx + vy*vy, 1.5);

        ax += vx * force;
        ay += vy * force;
    }

    this.acceleration = new Vector(ax, ay);
};
