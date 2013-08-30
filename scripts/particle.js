define('particle', ['vector'], function(Vector) {
    var Particle = function(position, velocity, acceleration) {
        this.position = position || new Vector();
        this.velocity = velocity || new Vector();
        this.acceleration = acceleration || new Vector();
        this.isAlive = true;
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

            var v = field.position.copy().subtract(this.position);
            var mag = v.getMagnitude();

            if (mag <= field.size/2) {
                this.isAlive = false;
                break;
            }

            var force = field.mass / Math.pow(mag, 3);

            ax += v.x * force;
            ay += v.y * force;
        }

        this.acceleration = new Vector(ax, ay);
    };

    return Particle;
});
