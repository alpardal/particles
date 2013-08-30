define([], function() {

    var EmittersRenderer = function(emitters) {
        this.emitters = emitters;
    };

    EmittersRenderer.prototype.drawEmitter = function(emitter, ctx) {
        if (emitter.hover) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';

            ctx.beginPath();
            ctx.arc(emitter.position.x, emitter.position.y,
                    emitter.radius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }
    };

    EmittersRenderer.prototype.render = function(ctx) {
        for(var i = 0; i < this.emitters.length; i++) {
            this.drawEmitter(this.emitters[i], ctx);
        }
    };

    return EmittersRenderer;
});
