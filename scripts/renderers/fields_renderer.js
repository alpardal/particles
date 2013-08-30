define('renderers/fields_renderer', [], function() {

    var FieldsRenderer = function(fields) {

        var drawField = function(field, ctx) {
            ctx.fillStyle = field.mass < 0 ? '#f00' : '#0f0';

            ctx.beginPath();
            ctx.arc(field.position.x, field.position.y,
                    field.size, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
        };

        this.render = function(ctx) {
            for (var i = 0; i < fields.length; i++) {
                drawField(fields[i], ctx);
            }
        };
    };

    return FieldsRenderer;
});
