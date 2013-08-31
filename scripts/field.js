define(['screen_object'], function(ScreenObject) {

    var Field = function(position, mass) {
        this.position = position;
        this.setMass(mass);
        this.firstDrag = true;
    };

    Field.prototype = Object.create(ScreenObject.prototype);

    Field.prototype.setMass = function(mass) {
        this.mass = mass;
        this.size = 15 * Math.abs(mass) / 1000.0;
        this.size = (this.size < Field.MIN_SIZE) ?
                            Field.MIN_SIZE : this.size;
    };

    Field.prototype.drag = function(delta, event) {
        if (event.ctrlKey || this.firstDrag) {
            var massDelta = 10 * delta.x;
            this.setMass(this.mass + massDelta);
        } else {
            this.position.add(delta);
        }
    };

    Field.prototype.stopDrag = function() {
        this.firstDrag = false;
    };

    Field.MIN_SIZE = 3;

    return Field;
});
