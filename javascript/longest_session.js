const s3 = ( sketch ) => {
    var full;
    var empty;
    var xml;
    var time;
    var hourglassW;
    var hourglassH;
    var rows;
    var canvas;
    var lastRow;
    var counter;
    var mouse;

    sketch.preload = function() {
        // 116x164 images
        full = sketch.loadImage("hourglass.png");
        empty = sketch.loadImage("hourglass1.png");
        xml = sketch.loadXML("data/seja.xml");
    }

    sketch.setup = function() {
        hourglassW = sketch.windowWidth/20;
        hourglassH = hourglassW*164/116;

        time = 0;
        let when = xml.getChild("text").getChild("body").getChild("timeline").getChildren("when");
        for(let i = 0; i < when.length; i++) {
            if(when[i].getString("interval") !== null) {
                time += parseInt(when[i].getString("interval"));
            }
        }

        rows = Math.ceil(time/36000);
        lastRow = Math.ceil((time/3600)%10);

        canvas = sketch.createCanvas(sketch.windowWidth, rows*hourglassH+30);
        canvas.parent("longest_session");

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < 10; j++) {
                sketch.image(empty, sketch.windowWidth/4+hourglassW*j, 30+hourglassH*i, hourglassW, hourglassH);
            }
        }

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Najdaljša seja", 0, 0, sketch.windowWidth, 30);

        counter = 0;
        mouse = 0;
    }

    sketch.draw = function() {
        sketch.frameRate(5);
        for(let i = 0; i < rows; i++) {
            if (i*hourglassH < sketch.mouseY) {
                mouse = (i+1)*10;
            }
        }
        if (counter < Math.min(mouse, (rows-1)*10+lastRow)) {
            sketch.image(full, sketch.windowWidth/4+hourglassW*(counter%10), 30+hourglassH*Math.floor(counter/10), hourglassW, hourglassH);
            counter++;
        }
    }

};

new p5(s3);