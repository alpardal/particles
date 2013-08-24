(function() {
    var canvas = new ParticleCanvas('#particles-canvas');
    var world = new World(canvas.bounds);

    world.addEmitter(new Emitter(new Vector(canvas.width/8, canvas.height*7/8),
                                Vector.fromAngle(-Math.PI/8, 2)));
    world.addEmitter(new Emitter(new Vector(canvas.width/8, canvas.height/8),
                                Vector.fromAngle(Math.PI/8, 2)));

    canvas.update = function() {
        world.updateParticles();
    };
    canvas.draw = function(ctx) {
        world.drawParticles(ctx);
    }

    canvas.loop();
})();
