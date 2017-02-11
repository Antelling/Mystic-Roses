$(function () {
    canvas = document.getElementById("canvas");
    can = canvas.getContext("2d");

    window.setTimeout(draw, 1); //I hate this language

    can.lineWidth = 0;
    can.canvas.width = window.innerWidth;
    can.canvas.height = window.innerHeight;
});

function draw() {
    //first we need a circle of dots
    //let our circle be as big as it can be, but have 20px padding
    var viewportMin = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
    var radius = viewportMin / 2 - 20;
    var coordinates = [window.innerWidth / 2, window.innerHeight / 2];

    //so now we have this conceptual circle
    //we want to put a collection of dots around it, according to the amount specified in settings
    var dots = [];
    var radiansInterval = Math.PI * 2 / settings.dots;
    for (var i = 0; i < settings.dots; i++) {
        dots.push(
            [
                coordinates[0] + Math.cos(radiansInterval * i) * radius,
                coordinates[1] + Math.sin(radiansInterval * i) * radius
            ]
        )
    }

    //let us graph our dots
    //dots.forEach(function (dot) {
    //    drawCircle(dot[0], dot[1], settings.dotWeight, "black")
    //});

    //now this is the tricky part
    //we loop over our sprites for the duration of our steps
    //every step, we update the sprite counter
    //if the step counter is 0, we update the step position
    //we then draw lines between all the steps

    //first we need to give every sprite a counter
    sprites = settings.sprites;
    sprites.map(function (sprite) {
        sprite.counter = 1;
        return sprite;
    });

    var replica1 = copy(sprites);
    console.log(replica1);

    //now we loop
    for (i = 0; i < settings.generations; i++) {
        sprites.map(function (sprite) {
            sprite.counter++;
            if (sprite.counter > sprite.moveEvery) {
                sprite.counter = 1;
            }
            if (sprite.counter === 1) {
                //lets just steal start to hold our current position
                sprite.start += sprite.moveBy;
                if (sprite.start >= dots.length) {
                    sprite.start  = sprite.start - dots.length;
                }
            }
            return sprite;
        });
        //now we draw lines between the sprites
        sprites.forEach(function (sprite1) {
            sprites.forEach(function (sprite2) {
                lineBetween(
                    dots[sprite1.start][0],
                    dots[sprite1.start][1],
                    dots[sprite2.start][0],
                    dots[sprite2.start][1],
                    settings.lineWeight,
                    "black"
                );
            })
        })
    }
}

function copy(object) { //i think javascript is just trolling now
    return jQuery.extend(true, {}, object); //jquery to copy an object. This language.
}
