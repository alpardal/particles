Rectangle = function(position, width, height) {

    this.contains = function(point) {
        return point.x >= 0 && point.x < width &&
               point.y >= 0 && point.y < height;
    };
}
