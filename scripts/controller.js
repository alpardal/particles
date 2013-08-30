define(['vector'], function(Vector) {

    var Controller = function(world) {

        var ctrl = this;
        ctrl.selectedField = -1;
        ctrl.previousMousePosition = null;

        this.doubleClick = function(e) {
            var field = world.findFieldAt(e.x, e.y);
            if (field >= 0) {
                world.removeField(field);
            }
        };

        this.mouseDown = function(e) {
            if (e.button !== 0) { return; }

            ctrl.selectedField = world.findFieldAt(e.x, e.y);
            ctrl.previousMousePosition = new Vector(e.x, e.y);

            if (ctrl.selectedField >= 0) {
                ctrl.resizing = e.ctrlKey;
            } else {
                ctrl.selectedField = world.createFieldAt(ctrl.previousMousePosition);
                ctrl.resizing = true;
            }
        };

        this.mouseMove = function(e) {
            var mousePosition = new Vector(e.x, e.y);

            if (ctrl.selectedField >= 0) {
                var delta = mousePosition.copy().subtract(ctrl.previousMousePosition);
                if (ctrl.resizing) {
                    world.changeFieldMass(ctrl.selectedField, delta);
                } else {
                    world.moveField(ctrl.selectedField, delta);
                }
                ctrl.previousMousePosition = mousePosition;
            }
        };

        this.mouseUp = function(e) {
            ctrl.selectedField = -1;
            ctrl.previousMousePosition = null;
            ctrl.resizing = false;
        };
    };

    return Controller;
});
