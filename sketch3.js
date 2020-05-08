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

    sketch.preload = function() {
        // 116x164 images
        full = sketch.loadImage("hourglass.png");
        empty = sketch.loadImage("hourglass1.png");
        xml = sketch.loadXML("data/seja.xml");
    }

    sketch.setup = function() {
        console.log(full.width, full.height);
        hourglassW = sketch.windowWidth/20;
        hourglassH = hourglassW*164/116;
        console.log(hourglassW, hourglassH);

        time = 0;
        let when = xml.getChild("text").getChild("body").getChild("timeline").getChildren("when");
        for(let i = 0; i < when.length; i++) {
            if(when[i].getString("interval") !== null) {
                time += parseInt(when[i].getString("interval"));
                console.log(when[i].getString("interval"));
            }
        }
        console.log(time);

        rows = Math.ceil(time/36000);
        lastRow = Math.ceil((time/3600)%10);
        console.log(rows, lastRow);

        canvas = sketch.createCanvas(sketch.windowWidth, rows*hourglassH+30);
        canvas.parent("canvas3");
        console.log(sketch.windowWidth, rows*hourglassH);

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
    }

    sketch.draw = function() {
        for(let i = 0; i < rows-1; i++) {
            if (i*hourglassH < sketch.mouseY) {
                for(let j = 0; j < 10; j++) {
                    sketch.image(full, sketch.windowWidth/4+hourglassW*j, 30+hourglassH*i, hourglassW, hourglassH);
                    sketch.frameRate(10);
                }
            }
        }
        if ((rows-1)*hourglassH < sketch.mouseY) {
            for(let j = 0; j < lastRow; j++) {
                sketch.image(full, sketch.windowWidth/4+hourglassW*j, 30+hourglassH*(rows-1), hourglassW, hourglassH);
                sketch.frameRate(10);
            }
        }
    }

};

new p5(s3);