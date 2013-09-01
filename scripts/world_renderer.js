define(['renderers/particle_renderer',
        'renderers/fields_renderer',
        'renderers/emitters_renderer'],
       function(ParticleRenderer, FieldsRenderer, EmittersRenderer) {

    var WorldRenderer = function(world) {

        this.render = function(ctx) {
            new ParticleRenderer(world.particles).render(ctx);
            new FieldsRenderer(world.fields).render(ctx);
            new EmittersRenderer(world.emitters).render(ctx);
        };
    };

    return WorldRenderer;
});
