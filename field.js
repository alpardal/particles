Field = function(position, mass) {
    this.position = position;
    this.setMass(mass);
    this.size = 5;
};

Field.prototype.setMass = function(mass) {
    this.mass = mass || 100;
    this.drawColor = mass < 0 ? '#f00' : '#0f0';
};

Field.prototype.draw = function(ctx) {
    var fill = ctx.fillStyle;

    ctx.fillStyle = this.drawColor;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = fill;
};
