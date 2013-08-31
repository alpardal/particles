define(['vector', 'rectangle', 'world_renderer', 'field', 'emitter', 'physics'],
       function(Vector, Rectangle, WorldRenderer, Field, Emitter, Physics) {

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
            fields = removeMarkedObjects(fields);
            emitters = removeMarkedObjects(emitters);
            particles = physics.updateParticles(particles, fields, emitters);
        };

        this.draw = function(ctx) {
            new WorldRenderer(particles, fields, emitters).render(ctx);
        };

        this.addEmitter = function(emitter) {
            emitters.push(emitter);
        };

        this.createFieldAt = function(position) {
            var defaultMass = 500;
            var field = new Field(position, defaultMass);
            fields.push(field);
            return field;
        };

        this.createEmitterAt = function(position) {
            var emitter = new Emitter(position, Vector.fromAngle(0, 4));
            emitters.push(emitter);
            return emitter;
        }

        this.objectAt = function(position) {
            return findObjectAt(fields, position) ||
                   findObjectAt(emitters, position);
        };

        this.remove = function(object) {
            object.shouldRemove = true;
        };

        this.removeAllFields = function() {
            fields = [];
        };

        var findObjectAt = function(collection, position) {
            for (var i = collection.length-1; i >= 0; i--) {
                var object = collection[i];
                if (object.contains(position.x, position.y)) {
                    return object;
                }
            }
            return null;
        };

        var removeMarkedObjects = function(collection) {
            var newCollection = [];
            for (var i = 0; i < collection.length; i++) {
                var object = collection[i];
                if (!object.shouldRemove) {
                    newCollection.push(object);
                }
            }
            return newCollection;
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
