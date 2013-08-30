define(['vector'], function(Vector) {

    var Controller = function(world) {

        var ctrl = this;
        ctrl.previousMousePosition = null;
        ctrl.selectedField = -1;
        ctrl.selectedEmitter = -1;

        this.doubleClick = function(e) {
            var field = world.findFieldAt(new Vector(e.x, e.y));
            if (field >= 0) {
                world.removeField(field);
            }
        };

        this.mouseDown = function(e) {
            if (e.button !== 0) { return; }

            var clickPosition = new Vector(e.x, e.y);
            ctrl.previousMousePosition = clickPosition;

            ctrl.selectedField = world.findFieldAt(clickPosition);
            ctrl.selectedEmitter = world.findEmitterAt(clickPosition);

            if (ctrl.selectedField >= 0) {
                ctrl.resizing = e.ctrlKey;
                return;
            }

            if (ctrl.selectedEmitter >= 0) {
                ctrl.changeSpread = e.ctrlKey;
                ctrl.changeAngle = e.shiftKey;
            } else {
                ctrl.selectedField = world.createFieldAt(clickPosition);
                ctrl.resizing = true;
            }
        };

        this.mouseMove = function(e) {
            if (ctrl.previousMousePosition === null) { return; }

            var mousePosition = new Vector(e.x, e.y);
            var delta = mousePosition.copy().subtract(ctrl.previousMousePosition);

            if (ctrl.selectedField >= 0) {
                if (ctrl.resizing) {
                    world.changeFieldMass(ctrl.selectedField, delta);
                } else {
                    world.moveField(ctrl.selectedField, delta);
                }
            } else {
                if (ctrl.selectedEmitter >= 0) {
                    if (ctrl.changeSpread) {
                        world.changeEmitterSpread(ctrl.selectedEmitter, delta);
                    } else {
                        if (ctrl.changeAngle) {
                            world.changeEmitterAngle(ctrl.selectedEmitter,
                                                     mousePosition);
                        } else {
                            world.moveEmitter(ctrl.selectedEmitter, delta);
                        }
                    }
                }
            }

            ctrl.previousMousePosition = mousePosition;
        };

        this.mouseUp = function(e) {
            ctrl.selectedField = -1;
            ctrl.previousMousePosition = null;
            ctrl.resizing = false;
        };
    };

    return Controller;
});
