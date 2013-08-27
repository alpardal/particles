define('vector', [], function() {
    var Vector = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
    Vector.prototype.copy = function() {
        return new Vector(this.x, this.y);
    };
    Vector.prototype.add = function(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    };
    Vector.prototype.subtract = function(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    };
    Vector.prototype.scale = function(k) {
        this.x = this.x * k;
        this.y = this.y * k;
        return this;
    }
    Vector.prototype.getMagnitude = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.getAngle = function() {
        return Math.atan2(this.y, this.x);
    };
    Vector.prototype.toString = function() {
        return '(' + Math.round(this.x) + ', ' +
                     Math.round(this.y) + ')';
    };
    Vector.fromAngle = function(angle, magnitude) {
        return new Vector(magnitude * Math.cos(angle),
                          magnitude * Math.sin(angle));
    };
    Vector.ORIGIN = new Vector(0, 0);

    return Vector;
});
