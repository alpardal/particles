define(['vector', 'screen_object'], function(Vector, ScreenObject) {

    DUMMY_OBJECT = new ScreenObject();

    var Controller = function(world) {

        var ctrl = this;
        ctrl.previousMousePosition = null;
        ctrl.selectedObject = DUMMY_OBJECT;
        ctrl.hoveredObject = DUMMY_OBJECT;

        this.doubleClick = function(e) {
            var object = world.objectAt(new Vector(e.x, e.y));
            if (object) {
                world.remove(object);
            }
        };

        this.mouseDown = function(e) {
            var clickPosition = new Vector(e.x, e.y);
            ctrl.previousMousePosition = clickPosition;

            selectObject(world.objectAt(clickPosition) ||
                         createObjectAt(clickPosition, e));
        };

        this.mouseUp = function(e) {
            clearSelection();
        };

        this.mouseEnter = function(e) {
            ctrl.previousMousePosition = new Vector(e.x, e.y);
        };

        this.mouseLeave = function(e) {
            clearSelection();
            clearHover();
        };

        this.mouseMove = function(e) {
            var mousePosition = new Vector(e.x, e.y);
            var delta = mousePosition.copy().subtract(ctrl.previousMousePosition);

            ctrl.selectedObject.mouseDrag(delta, e);

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

        var selectObject = function(object) {
            object.mouseDown();
            ctrl.selectedObject = object;
        };

        var clearSelection = function() {
            ctrl.selectedObject.mouseUp();
            ctrl.selectedObject = DUMMY_OBJECT;
        };

        var hoverObject = function(object) {
            if (ctrl.hoveredObject !== object) {
                ctrl.hoveredObject.mouseExit();
                object.mouseEnter();
                ctrl.hoveredObject = object;
            }
        };

        var clearHover = function() {
            ctrl.hoveredObject.mouseExit();
            ctrl.hoveredObject = DUMMY_OBJECT;
        };
    };

    return Controller;
});
