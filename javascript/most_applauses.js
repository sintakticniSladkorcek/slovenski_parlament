const s4 = ( sketch ) => {

    var countApplauses;
    var canvas;
    var mouse;
    var shown;
    var img;
    var seja;
    var table;

    sketch.preload = function() {
        //xml = sketch.loadXML("data/seja.xml");
        img = sketch.loadImage("pictures/applause.jpg");
        table = sketch.loadTable("parsed_data/events/applauses.csv");
    }

    sketch.setup = function() {

        seja = table.get(0, 0);
        countApplauses = table.get(0, 1);
        seja = sessionNameFormating(seja);

        sketch.createCanvasAndTitle();
        mouse = 0;
        shown = 0;
    }

    sketch.draw = function() {
        sketch.frameRate(5);
        for(let i = 0; i < countApplauses; i++) {
            if (i*imgH < sketch.mouseY) {
                mouse = (i+1)*10;
            }
        }
        if (shown < Math.min(mouse, countApplauses)) {
            sketch.image(img, sketch.windowWidth/4+imgW*(shown%10), 50+imgH*Math.floor(shown/10), imgW, imgH);
            shown++;
        }
    }

    sketch.drawHands = function() {
        if(shown === countApplauses) {
            for(let i = 0; i < countApplauses; i++) {
                sketch.image(img, sketch.windowWidth/4+imgW*(i%10), 50+imgH*Math.floor(i/10), imgW, imgH);
            }
        }
    }

    sketch.createCanvasAndTitle = function() {
        imgW = sketch.windowWidth/20;
        imgH = imgW;

        canvas = sketch.createCanvas(sketch.windowWidth, 50+imgH*Math.ceil(countApplauses/10));
        canvas.parent('most_applauses');

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Največ aplavzov na seji", 0, 0, sketch.windowWidth, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        my_string = seja + ": " + countApplauses + " aplavzov"
        sketch.text(my_string, 0, 30, sketch.windowWidth, 20);
    }

    sketch.windowResized = function() {
        sketch.createCanvasAndTitle();
        sketch.drawHands();
    }

}

new p5(s4);
