define(['vector', 'rectangle', 'world_renderer', 'field', 'physics'],
       function(Vector, Rectangle, WorldRenderer, Field, Physics) {

    var World = function(width, height) {
        var maxParticles = 5000;
        var emitters = [];
        var fields = [];
        var particles = [];
        var bounds = new Rectangle(new Vector(), width, height);
        var physics = new Physics(maxParticles, bounds);

        this.width = width;
        this.height = height;

        this.update = function() {
            particles = physics.updateParticles(particles, fields, emitters);
        };

        this.draw = function(ctx) {
            new WorldRenderer(particles, fields).render(ctx);
        };

        this.addEmitter = function(emitter) {
            emitters.push(emitter);
        };

        this.createFieldAt = function(position) {
            var defaultMass = 500;
            var field = new Field(position, defaultMass);
            fields.push(field);
            return fields.length-1;
        };

        this.findFieldAt = function(x, y) {
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].contains(x, y)) {
                    return i;
                }
            }
            return -1;
        };

        this.moveField = function(fieldIndex, delta) {
            fields[fieldIndex].position.add(delta);
        };

        this.changeFieldMass = function(fieldIndex, delta) {
            var field = fields[fieldIndex];
            var massDelta = 10*delta.x;
            field.setMass(field.mass + massDelta);
        };

        this.removeField = function(fieldIndex) {
            fields.splice(fieldIndex, 1);
        };

        this.removeAllFields = function() {
            fields = [];
        };

        this.addRandomFields = function() {
            this.removeAllFields();
            var numOfFields = 5 + 10 * Math.random();

            for (var i = 0; i < numOfFields; i++) {
                var x = this.width * Math.random(),
                    y = this.height * Math.random(),
                mass = -1000 + 2000 * Math.random();
                var pos = new Vector(x, y);
                fields.push(new Field(new Vector(x, y), mass))
            }
        };

    };

    return World;
});
