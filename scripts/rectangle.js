define([], function() {
    var Rectangle = function(position, width, height) {

        this.x = position.x;
        this.y = position.y;
        this.width = width;
        this.height = height;

        this.contains = function(point) {
            return point.x >= this.x && point.x < (this.x + width) &&
                   point.y >= this.y && point.y < (this.y + height);
        };
    };

    return Rectangle;
});
