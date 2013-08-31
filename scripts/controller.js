define(['vector', 'screen_object'], function(Vector, ScreenObject) {

    DUMMY_OBJECT = new ScreenObject();

    var Controller = function(world) {

        var ctrl = this;
        ctrl.previousMousePosition = null;
        ctrl.clickedObject = DUMMY_OBJECT;
        ctrl.hovered = DUMMY_OBJECT;

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
            ctrl.clickedObject = DUMMY_OBJECT;
        };

        this.mouseMove = function(e) {
            var mousePosition = new Vector(e.x, e.y);
            ctrl.previousMousePosition = ctrl.previousMousePosition ||
                                         mousePosition;
            var delta = mousePosition.copy().subtract(ctrl.previousMousePosition);

            ctrl.clickedObject.mouseDrag(delta, e);

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
            if (ctrl.hovered !== object) {
                ctrl.hovered.mouseExit();
                object.mouseEnter();
                ctrl.hovered = object;
            }
        };

        var clearHover = function() {
            ctrl.hovered.mouseExit();
            ctrl.hovered = DUMMY_OBJECT;
        };
    };

    return Controller;
});
