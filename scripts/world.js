define('world',
       ['vector', 'rectangle', 'world_renderer', 'field', 'physics'],
       function(Vector, Rectangle, WorldRenderer, Field, Physics) {

    var World = function(width, height) {
        var maxParticles = 5000;
        var emitters = [];
        var fields = [];
        var particles = [];
        var bounds = new Rectangle(Vector.ORIGIN, width, height);
        var physics = new Physics(maxParticles, bounds);

        this.width = width;
        this.height = height;

        this.addEmitter = function(emitter) {
            emitters.push(emitter);
        };

        this.addFieldAt = function(x, y, mass) {
            var field = new Field(new Vector(x, y), mass);
            fields.push(field);
        };

        this.update = function() {
            particles = physics.updateParticles(particles, fields, emitters);
        };

        this.draw = function(ctx) {
            new WorldRenderer(particles, fields).render(ctx);
        };

    };

    return World;
});
