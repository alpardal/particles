define([], function() {

    var ScreenObject = function(position, size) {
        this.position = position;
        this.size = size;
    };

    ScreenObject.prototype = {
        contains: function(point) {
            return Math.abs(this.position.x - point.x) <= this.size &&
                Math.abs(this.position.y - point.y) <= this.size;
        },
        mouseDown: function() {
            this.dragging = true;
            this.doMouseDown();
        },
        mouseUp: function() {
            this.dragging = false;
            this.doMouseUp();
        },
        mouseEnter: function() {
            this.hover = true;
            this.doMouseEnter();
        },
        mouseExit: function() {
            this.hover = false;
            this.doMouseExit();
        },
        mouseDrag: function(delta, e) {
            this.doMouseDrag(delta, e);
        },

        doMouseDown:  function() {},
        doMouseUp:    function() {},
        doMouseEnter: function() {},
        doMouseExit:  function() {},
        doMouseDrag:  function() {}
    }

    return ScreenObject;

});
