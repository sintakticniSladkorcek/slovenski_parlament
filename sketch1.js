const s1 = ( sketch ) => {

    var canvas;
    var w;
    var h;
    var img;

    sketch.preload = function() {
        img = sketch.loadImage("parlament2.jpg");
    }

    sketch.setup = function() {
        w = sketch.windowWidth;
        h = (w*1332)/3000;

        canvas = sketch.createCanvas(w, h);
        canvas.parent('canvas1');

        sketch.textFont("Courier");
        //sketch.fill("#FF0000");
        sketch.textSize(36);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.textStyle(sketch.BOLD);
        sketch.text("Slovenski parlament med letoma 1990 in 1992", w/4, h/4, w/2, h/2);
    }

    sketch.draw = function() {
        let partsX = 16;
        let partsY = 8;
        for (var i = 0; i < partsX; i++) {
            for (var j = 0; j < partsY; j++) {
                if(i*(w/partsX) < sketch.mouseX && sketch.mouseX < (i+1)*(w/partsX) && j*(h/partsY) < sketch.mouseY && sketch.mouseY < (j+1)*(h/partsY)) {
                    sketch.image(img, i*(w/partsX), j*(h/partsY), w/partsX, h/partsY, i*(3000/partsX), j*(1332/partsY), 3000/partsX, 1332/partsY);
                    //text("Slovenski parlament med letoma 1990 in 1992", w/4, h/4, w/2, h/2);
                }
            }
        }
    }

    sketch.windowResized = function() {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
        w = sketch.windowWidth;
        h = (w*1332)/3000;
        sketch.text("Slovenski parlament med letoma 1990 in 1992", w/4, h/4, w/2, h/2);
    }
};

new p5(s1);