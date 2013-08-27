define('main', ['particle_canvas', 'world', 'emitter', 'vector'],
       function(ParticleCanvas, World, Emitter, Vector) {

    var world = new World(window.innerWidth, window.innerHeight);
    var speed = 4;

    world.addEmitter(new Emitter(new Vector(world.width/8,
                                            world.height*7/8),
                                 Vector.fromAngle(-Math.PI/8, speed)));
    world.addEmitter(new Emitter(new Vector(world.width/8,
                                            world.height/8),
                                 Vector.fromAngle(Math.PI/8, speed)));
    world.addEmitter(new Emitter(new Vector(world.width-50, world.height-50),
                                 Vector.fromAngle(Math.PI*1.25, speed)));

     var numOfFields = 5 + 10 * Math.random();

     for (var i = 0; i < numOfFields; i++) {
         var x = world.width * Math.random(),
             y = world.height * Math.random(),
             mass = -1000 + 2000 * Math.random();

         world.addFieldAt(x, y, mass);
     }

    new ParticleCanvas(world, '#particles-canvas').start();
});
