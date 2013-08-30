define(['renderers/particle_renderer', 'renderers/fields_renderer'],
       function(ParticleRenderer, FieldsRenderer) {

    var WorldRenderer = function(particles, fields) {

        this.render = function(ctx) {
            new ParticleRenderer(particles).render(ctx);
            new FieldsRenderer(fields).render(ctx);
        };
    };

    return WorldRenderer;
});
