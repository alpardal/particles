define(['vector'], function(Vector) {

    LEFT_MOUSE_BUTTON = 0;

    var Controller = function(world) {

        var ctrl = this;
        ctrl.previousMousePosition = null;
        ctrl.selectedObject = null;

        this.doubleClick = function(e) {
            var object = world.objectAt(new Vector(e.x, e.y));
            if (object) {
                world.remove(object);
            }
        };

        this.mouseDown = function(e) {
            if (e.button !== LEFT_MOUSE_BUTTON) { return; }

            var clickPosition = new Vector(e.x, e.y);
            ctrl.previousMousePosition = clickPosition;

            ctrl.selectedObject = world.objectAt(clickPosition);

            if (ctrl.selectedObject === null) {
                ctrl.selectedObject = world.createFieldAt(clickPosition);
            }
        };

        this.mouseUp = function(e) {
            if (ctrl.selectedObject) { ctrl.selectedObject.stopDrag(); }
            ctrl.selectedObject = null;
        };

        this.mouseMove = function(e) {
            var mousePosition = new Vector(e.x, e.y);

            if (ctrl.previousMousePosition === null) {
                ctrl.previousMousePosition = mousePosition;
            }

            var delta = mousePosition.copy().subtract(ctrl.previousMousePosition);

            if (ctrl.selectedObject) {
                ctrl.selectedObject.drag(delta, e);
            }

            clearHover();
            var hovered = world.objectAt(mousePosition);
            if (hovered) {
                hoverObject(hovered);
            }

            ctrl.previousMousePosition = mousePosition;
        };

        var hoverObject = function(object) {
            object.hover = true;
            ctrl.hovered = object;
        };

        var clearHover = function() {
            if (ctrl.hovered) { ctrl.hovered.hover = false; }
            ctrl.hovered = null;
        };
    };

    return Controller;
});
