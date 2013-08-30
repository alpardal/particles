define('controller', ['vector'], function(Vector) {

    var Controller = function(world) {

        this.selectedField = -1;

        this.doubleClick = function(e) {
            var field = world.findFieldAt(e.x, e.y);
            if (field >= 0) {
                world.removeField(field);
            }
        };

        this.mouseDown = function(e) {
            if (e.button !== 0) { return; }

            this.selectedField = world.findFieldAt(e.x, e.y);
            this.previousMousePosition = new Vector(e.x, e.y);

            if (this.selectedField >= 0) {
                this.resizing = e.ctrlKey;
            } else {
                this.selectedField = world.createFieldAt(this.previousMousePosition);
                this.resizing = true;
            }
        };

        this.mouseMove = function(e) {
            if (this.selectedField >= 0 && this.previousMousePosition) {
                var clickPosition = new Vector(e.x, e.y);
                var delta = clickPosition.copy().subtract(this.previousMousePosition);
                if (this.resizing) {
                    world.changeFieldMass(this.selectedField, delta);
                } else {
                    world.moveField(this.selectedField, delta);
                }
                this.previousMousePosition = clickPosition;
            }
        };

        this.mouseUp = function(e) {
            this.selectedField = -1;
            this.previousMousePosition = null;
            this.resizing = false;
        };
    };

    return Controller;
});
