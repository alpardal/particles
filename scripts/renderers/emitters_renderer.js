define([], function() {

    var EmittersRenderer = function(emitters) {
        this.emitters = emitters;
    };

    EmittersRenderer.prototype.drawEmitter = function(emitter, ctx) {
        if (emitter.hover || emitter.dragging) {
            drawControls(emitter, ctx);
        }
    };

    EmittersRenderer.prototype.render = function(ctx) {
        for(var i = 0; i < this.emitters.length; i++) {
            this.drawEmitter(this.emitters[i], ctx);
        }
    };

    var drawControls = function(emitter, ctx) {
        drawCircle(emitter, ctx);
        drawHandles(emitter, ctx);
    };

    var drawCircle = function(emitter, ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.arc(emitter.position.x, emitter.position.y,
                emitter.size, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    };

    var drawHandles = function(emitter, ctx) {
        var dir = emitter.velocity.copy().scale(10);

        var middle = dir.copy().scale(1.5).add(emitter.position)
        var leftEdge = middle.copy().add(dir.copy().scale(-1).scale(0.3).rotate(Math.PI/16));
        var rightEdge = middle.copy().add(dir.copy().scale(-1).scale(0.3).rotate(-Math.PI/16));

        var left = dir.rotate(emitter.spread).add(emitter.position);
        var right = dir.rotate(-emitter.spread).add(emitter.position);

        ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.beginPath();
        ctx.moveTo(emitter.position.x, emitter.position.y);
        ctx.lineTo(middle.x, middle.y);
        ctx.lineTo(leftEdge.x, leftEdge.y);
        ctx.lineTo(rightEdge.x, rightEdge.y);
        ctx.lineTo(middle.x, middle.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(emitter.position.x, emitter.position.y);
        ctx.lineTo(left.x, left.y);
        ctx.moveTo(left.x, left.y);
        ctx.arc(left.x, left.y, 1, 0, Math.PI*2);

        ctx.moveTo(emitter.position.x, emitter.position.y);
        ctx.lineTo(right.x, right.y);
        ctx.moveTo(right.x, right.y);
        ctx.arc(right.x, right.y, 1, 0, Math.PI*2);
        ctx.closePath();

        ctx.stroke();
        ctx.fill();
    };

    return EmittersRenderer;
});
