define([], function() {

    var Circle = function(position, radius) {
        this.position = position;
        this.radius = radius;
    };

    Circle.prototype.contains = function(x, y) {
        return Math.abs(this.position.x - x) <= this.radius &&
               Math.abs(this.position.y - y) <= this.radius;
    };

    return Circle;
});
