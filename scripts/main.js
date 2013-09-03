require(['particle_canvas', 'world', 'emitter', 'vector'],
       function(ParticleCanvas, World, Emitter, Vector) {

    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    var offset = 5;
    var world = new World(width - offset, height - offset);
    window.world = world;
    var speed = 4;

    world.addEmitter(new Emitter(new Vector(world.width/8,
                                            world.height*7/8),
                                 Vector.fromAngle(-Math.PI/8, speed)));
    world.addEmitter(new Emitter(new Vector(world.width/8,
                                            world.height/8),
                                 Vector.fromAngle(Math.PI/8, speed)));
    world.addEmitter(new Emitter(new Vector(world.width-50, world.height-50),
                                 Vector.fromAngle(Math.PI*1.25, speed)));

    new ParticleCanvas(world, '#particles-canvas').start();
});
