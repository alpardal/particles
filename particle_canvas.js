ParticleCanvas = function(selector) {
    var canvas = document.querySelector(selector);
    var shouldClear = true;
    canvas.addEventListener('click', function() {
        shouldClear = !shouldClear;
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.width = canvas.width;
    this.height = canvas.height;
    this.bounds = new Rectangle(Vector.ORIGIN, canvas.width,
                                               canvas.height);

    var ctx = canvas.getContext('2d');
    ctx.width = canvas.width;
    ctx.height = canvas.heigth;

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    var self = this;

    this.loop = function() {
        if (shouldClear) { clear(); }
        self.update();
        self.draw(ctx);

        window.requestAnimationFrame(self.loop);
    }
}
