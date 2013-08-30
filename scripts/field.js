define(['circle'], function(Circle) {

    var Field = function(position, mass) {
        this.position = position;
        this.setMass(mass);
    };

    Field.prototype = Object.create(Circle.prototype);

    Field.prototype.setMass = function(mass) {
        this.mass = mass;
        this.radius = 15 * Math.abs(mass) / 1000.0;
        this.radius = (this.radius < Field.MIN_RADIUS) ?
                            Field.MIN_RADIUS : this.radius;
    };

    Field.prototype.dragged = function(delta, event) {
        if (event.ctrlKey) {
            var massDelta = 10 * delta.x;
            this.setMass(this.mass + massDelta);
        } else {
            this.position.add(delta);
        }
    };

    Field.MIN_RADIUS = 3;

    return Field;
});
