const s6 = ( sketch ) => {

    var xml;

    sketch.preload = function() {
        xml = sketch.loadXML("data/seja.xml");
    }

    sketch.setup = function() {
        let canvas = sketch.createCanvas(sketch.windowWidth, 400);
        canvas.parent("canvas6");


    }

    sketch.draw = function() {

    }
}

new p5(s6);