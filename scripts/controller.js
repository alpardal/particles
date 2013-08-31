define(['vector'], function(Vector) {

    var Controller = function(world) {

        var ctrl = this;
        ctrl.previousMousePosition = null;
        ctrl.clickedObject = null;

        this.doubleClick = function(e) {
            var object = world.objectAt(new Vector(e.x, e.y));
            if (object) {
                world.remove(object);
            }
        };

        this.mouseDown = function(e) {
            var clickPosition = new Vector(e.x, e.y);
            ctrl.previousMousePosition = clickPosition;

            ctrl.clickedObject = world.objectAt(clickPosition) ||
                                 createObjectAt(clickPosition, e);

            ctrl.clickedObject.mouseDown();
        };

        this.mouseUp = function(e) {
            ctrl.clickedObject.mouseUp();
            ctrl.clickedObject = null;
        };

        this.mouseMove = function(e) {
            var mousePosition = new Vector(e.x, e.y);

            if (ctrl.previousMousePosition === null) {
                ctrl.previousMousePosition = mousePosition;
            }

            var delta = mousePosition.copy().subtract(ctrl.previousMousePosition);

            if (ctrl.clickedObject) {
                ctrl.clickedObject.mouseDrag(delta, e);
            }

            var object = world.objectAt(mousePosition);
            if (object) {
                hoverObject(object);
            } else {
                clearHover();
            }

            ctrl.previousMousePosition = mousePosition;
        };

        var createObjectAt = function(position, event) {
            return event.shiftKey ? world.createEmitterAt(position) :
                                    world.createFieldAt(position);
        };

        var hoverObject = function(object) {
            if (ctrl.hovered) {
                if (ctrl.hovered !== object) {
                    ctrl.hovered.mouseExit();
                }
            } else {
                object.mouseEnter();
            }
            ctrl.hovered = object;
        };

        var clearHover = function() {
            if (ctrl.hovered) {
                ctrl.hovered.mouseExit();
            }
            ctrl.hovered = null;
        };
    };

    return Controller;
});
