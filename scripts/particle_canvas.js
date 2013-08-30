define(['controller'], function(Controller) {

    var ParticleCanvas = function(world, selector) {
        var canvas = document.querySelector(selector);
        canvas.width = world.width;
        canvas.height = world.height;
        var ctx = canvas.getContext('2d');

        var controller = new Controller(world);
        canvas.addEventListener('dblclick', controller.doubleClick);
        canvas.addEventListener('mousedown', controller.mouseDown);
        canvas.addEventListener('mouseup', controller.mouseUp);
        canvas.addEventListener('mousemove', controller.mouseMove);

        this.start = function() {
            loop();
        };

        var loop = function() {
            clearBackground();
            world.update();
            world.draw(ctx);
            window.requestAnimationFrame(loop);
        };

        var clearBackground = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };

    };

    return ParticleCanvas;
});
