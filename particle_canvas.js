ParticleCanvas = function(selector) {
    var canvas = document.querySelector(selector);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.width = canvas.width;
    this.height = canvas.height;

    var ctx = canvas.getContext('2d');

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    var self = this;

    this.loop = function() {
        clear();
        self.update();
        self.draw(ctx);

        window.requestAnimationFrame(self.loop);
    }
}
