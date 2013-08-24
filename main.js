(function() {
    var canvas = new ParticleCanvas('#particles-canvas');
    var world = new World(canvas.bounds);
    var speed = 4;

    world.addEmitter(new Emitter(new Vector(canvas.width/8,
                                            canvas.height*7/8),
                                 Vector.fromAngle(-Math.PI/8, speed)));
    world.addEmitter(new Emitter(new Vector(canvas.width/8,
                                            canvas.height/8),
                                 Vector.fromAngle(Math.PI/8, speed)));
    world.addEmitter(new Emitter(new Vector(canvas.width-50, canvas.height-50),
                                 Vector.fromAngle(Math.PI*1.25, speed)));

     var randomField = function() {
         var pos = new Vector(canvas.width * Math.random(),
                              canvas.height * Math.random());
        var mass = -1000 + 2000 * Math.random();
        return new Field(pos, mass);
     }

     var numOfFields = 5 + 10 * Math.random();
     for (var i = 0; i < numOfFields; i++) {
         world.addField(randomField());
     }

    canvas.update = function() {
        world.updateParticles();
    };
    canvas.draw = function(ctx) {
        world.drawParticles(ctx);
    }

    canvas.loop();
})();
