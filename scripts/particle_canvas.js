define(['controller', 'world_renderer'], function(Controller, WorldRenderer) {

    var ParticleCanvas = function(world, selector) {
        var canvas = document.querySelector(selector);
        canvas.width = world.width;
        canvas.height = world.height;
        var ctx = canvas.getContext('2d');
        var worldRenderer = new WorldRenderer(world);

        var controller = new Controller(world);
        canvas.addEventListener('dblclick', controller.doubleClick);
        canvas.addEventListener('mousedown', controller.mouseDown);
        canvas.addEventListener('mouseup', controller.mouseUp);
        canvas.addEventListener('mousemove', controller.mouseMove);
        canvas.addEventListener('mouseover', controller.mouseEnter);
        canvas.addEventListener('mouseout', controller.mouseLeave);

        this.start = function() {
            loop();
        };

        var loop = function() {
            clearBackground();
            world.update();
            worldRenderer.render(ctx);
            window.requestAnimationFrame(loop);
        };

        var clearBackground = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };

    };

    return ParticleCanvas;
});
