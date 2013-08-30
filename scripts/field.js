define('field', [], function() {

    var Field = function(position, mass) {
        this.position = position;
        this.setMass(mass);
    };

    Field.prototype.setMass = function(mass) {
        this.mass = mass;
        this.size = 15 * Math.abs(mass) / 1000.0;
        this.size = (this.size < Field.MIN_SIZE) ? Field.MIN_SIZE : this.size;
    };

    Field.prototype.contains = function(x, y) {
        return Math.abs(this.position.x - x) <= this.size &&
               Math.abs(this.position.y - y) <= this.size;
    };

    Field.MIN_SIZE = 3;

    return Field;
});
