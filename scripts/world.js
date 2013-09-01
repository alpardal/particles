define(['vector', 'rectangle', 'field', 'emitter', 'physics', 'world_deserializer'],
       function(Vector, Rectangle, Field, Emitter, Physics, Deserializer) {

    var World = function(width, height) {
        var maxParticles = 5000;
        var bounds = new Rectangle(new Vector(), width, height);
        var physics = new Physics(maxParticles, bounds);

        this.width = width;
        this.height = height;
        this.particles = [];
        this.fields = [];
        this.emitters = [];

        this.update = function() {
            this.fields = removeMarkedObjects(this.fields);
            this.emitters = removeMarkedObjects(this.emitters);
            this.particles = physics.updateParticles(this.particles, this.fields, this.emitters);
        };

        this.addEmitter = function(emitter) {
            this.emitters.push(emitter);
        };

        this.createFieldAt = function(position) {
            var defaultMass = 500;
            var field = new Field(position, defaultMass);
            this.fields.push(field);
            return field;
        };

        this.createEmitterAt = function(position) {
            var emitter = new Emitter(position, Vector.fromAngle(0, 4));
            this.emitters.push(emitter);
            return emitter;
        }

        this.objectAt = function(position) {
            return findObjectAt(this.fields, position) ||
                   findObjectAt(this.emitters, position);
        };

        this.remove = function(object) {
            object.shouldRemove = true;
        };

        this.removeAllFields = function() {
            this.fields = [];
        };

        this.serialize = function() {
            return JSON.stringify({fields: this.fields, emitters: this.emitters}).replace(/"/g, "'");
        };

        this.deserialize = function(string) {
            var deserializer = new Deserializer(string.replace(/'/g, '"'));
            this.fields = deserializer.fields();
            this.emitters = deserializer.emitters();
        };

        var findObjectAt = function(collection, position) {
            for (var i = collection.length-1; i >= 0; i--) {
                var object = collection[i];
                if (object.contains(position)) {
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
                this.fields.push(new Field(new Vector(x, y), mass))
            }
        };

    };

    return World;
});
