define('particle_canvas', [], function() {
    var ParticleCanvas = function(world, selector) {
        var canvas = document.querySelector(selector);
        canvas.width = world.width;
        canvas.height = world.height;

        var ctx = canvas.getContext('2d');
        var shouldClear = true;

        canvas.addEventListener('click', function() {
            shouldClear = !shouldClear;
        });

        this.start = function() {
            loop();
        };

        var loop = function() {
            if (shouldClear) { clear(); }

            world.update();
            world.draw(ctx);

            window.requestAnimationFrame(loop);
        };

        var clear = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };

    };

    return ParticleCanvas;
});
