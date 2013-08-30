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

        this.mouseMove = function(e) {
            if (ctrl.previousMousePosition === null) { return; }

            var mousePosition = new Vector(e.x, e.y);
            var delta = mousePosition.copy().subtract(ctrl.previousMousePosition);

            if (ctrl.selectedObject) {
                ctrl.selectedObject.dragged(delta, e);
            }

            ctrl.previousMousePosition = mousePosition;
        };

        this.mouseUp = function(e) {
            ctrl.previousMousePosition = null;
            ctrl.selectedObject = null;
        };
    };

    return Controller;
});
