(function() {
    var canvas = new ParticleCanvas('#particles-canvas');
    var world = new World(canvas.bounds);

    world.addEmitter(new Emitter(new Vector(canvas.width/8,
                                            canvas.height*7/8),
                                 Vector.fromAngle(-Math.PI/8, 4)));
    world.addEmitter(new Emitter(new Vector(canvas.width/8,
                                            canvas.height/8),
                                 Vector.fromAngle(Math.PI/8, 4)));

    world.addField(new Field(new Vector(canvas.width*7/8,
                                        canvas.height/4), -540));
    world.addField(new Field(new Vector(canvas.width*0.6,
                                        canvas.height*0.1), -800));
    world.addField(new Field(new Vector(canvas.width*0.65,
                                        canvas.height*0.15), 500));
    world.addField(new Field(new Vector(canvas.width/3,
                                        canvas.height/2), 350));
    world.addField(new Field(new Vector(canvas.width*0.8,
                                        canvas.height*0.8), -700));

    canvas.update = function() {
        world.updateParticles();
    };
    canvas.draw = function(ctx) {
        world.drawParticles(ctx);
    }

    canvas.loop();
})();
