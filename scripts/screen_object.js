define([], function() {

    var ScreenObject = function(position, size) {
        this.position = position;
        this.size = size;
    };

    ScreenObject.prototype.contains = function(point) {
        return Math.abs(this.position.x - point.x) <= this.size &&
               Math.abs(this.position.y - point.y) <= this.size;
    };

    return ScreenObject;

});
