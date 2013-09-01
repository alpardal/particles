define(['vector', 'field', 'emitter'], function(Vector, Field, Emitter) {

    var WorldDeserializer = function(string) {
        this.data = JSON.parse(string);
    };

    var setPrototype = function(object, constructorFunction) {
        object.__proto__ = constructorFunction.prototype;
    };

    WorldDeserializer.prototype = {
        fields: function() {
            this.data.fields.forEach(function(field) {
                setPrototype(field, Field);
                setPrototype(field.position, Vector);
            });
            return this.data.fields
        },
        emitters: function() {
            this.data.emitters.forEach(function(emitter) {
                setPrototype(emitter, Emitter);
                setPrototype(emitter.position, Vector);
                setPrototype(emitter.velocity, Vector);
            });
            return this.data.emitters;
        }
    };

    return WorldDeserializer;
});
