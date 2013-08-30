define('controller', ['vector'], function(Vector) {

    var Controller = function(world) {

        this.selectedField = -1;

        this.doubleClick = function(e) {
            var field = world.fieldAt(e.x, e.y);
            if (field >= 0) {
                world.removeField(field);
            }
        };

        this.mouseDown = function(e) {
            if (e.button !== 0) { return; }

            this.selectedField = world.fieldAt(e.x, e.y);
            this.previousMousePosition = new Vector(e.x, e.y);

            if (this.selectedField >= 0) {
                this.resizing = e.ctrlKey;
            } else {
                this.selectedField = addField(e);
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

    var addField = function(e) {
        var mass = (e.button === 0) ? 500 : -500;
        return world.addFieldAt(e.x, e.y, mass);
    };

    var addRandomFields = function(world) {
        world.removeAllFields();
        var numOfFields = 5 + 10 * Math.random();

        for (var i = 0; i < numOfFields; i++) {
            var x = world.width * Math.random(),
            y = world.height * Math.random(),
            mass = -1000 + 2000 * Math.random();

            world.addFieldAt(x, y, mass);
        }
    };


    return Controller;
});
