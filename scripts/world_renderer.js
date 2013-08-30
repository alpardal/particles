define(['renderers/particle_renderer',
        'renderers/fields_renderer',
        'renderers/emitters_renderer'],
       function(ParticleRenderer, FieldsRenderer, EmittersRenderer) {

    var WorldRenderer = function(particles, fields, emitters) {

        this.render = function(ctx) {
            new ParticleRenderer(particles).render(ctx);
            new FieldsRenderer(fields).render(ctx);
            new EmittersRenderer(emitters).render(ctx);
        };
    };

    return WorldRenderer;
});
