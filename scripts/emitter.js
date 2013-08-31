define(['vector', 'particle', 'screen_object'],
       function(Vector, Particle, ScreenObject) {
    var Emitter = function(position, velocity, spread) {
        this.position = position;
        this.velocity = velocity;
        this.spread = spread || Math.PI/8 * Math.random();
        this.drawColor = '#999';
        this.emissionRate = 8 * Math.random();
        this.size = 40;
    };

    Emitter.prototype = Object.create(ScreenObject.prototype);

    Emitter.prototype.setSpread = function(spread) {
        spread = (spread < 0) ? 0 : spread;
        spread = (spread > Math.PI) ? Math.PI : spread;
        this.spread = spread;
    };

    Emitter.prototype.setDirection = function(direction) {
        var speed = this.velocity.length();
        this.velocity = direction.normalize().scale(speed);
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

    Emitter.prototype.doMouseDrag = function(delta, event) {
        if (event.altKey) { delta.scale(0.3); }

        if (event.ctrlKey) {
            this.setSpread(this.spread - delta.y * Math.PI/180);
            return;
        }
        if (event.shiftKey) {
            var direction = new Vector(event.x, event.y).subtract(this.position);
            this.setDirection(direction);
            return;
        }
        this.position.add(delta);
    };

    return Emitter;
});
