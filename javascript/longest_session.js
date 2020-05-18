const s3 = ( sketch ) => {
    var full;
    var empty;
    var table;
    var time_h;
    var hourglassW;
    var hourglassH;
    var canvas;
    var rowsShortest;
    var rowsLongest;
    var counterShortest;
    var shownShortest;
    var counterLongest;
    var shownLongest;
    var shortestSession;
    var longestSession;

    sketch.preload = function() {
        // 116x164 images
        full = sketch.loadImage("pictures/hourglass.png");
        empty = sketch.loadImage("pictures/hourglass1.png");
        table = sketch.loadTable("parsed_data/session_duration/session_duration.csv");
    }

    sketch.setup = function() {
        /*hourglassW = sketch.windowWidth/20;
        hourglassH = hourglassW*164/116;*/

        /*time = 0;
        let when = xml.getChild("text").getChild("body").getChild("timeline").getChildren("when");
        for(let i = 0; i < when.length; i++) {
            if(when[i].getString("interval") !== null) {
                time += parseInt(when[i].getString("interval"));
            }
        }*/
        shortestSession = [0, 100];
        longestSession = [0, 0];
        console.log(table.getRows().length);
        for(let i = 0; i < table.getRows().length; i++) {
            let current = table.getString(i, 2);
            if(current < shortestSession[1] && current > 0) {
                shortestSession[0] = i;
                shortestSession[1] = current;
            }
            else if(current > longestSession[1]) {
                longestSession[0] = i;
                longestSession[1] = current;
            }
        }

        rowsShortest = [Math.ceil(shortestSession[1]), Math.ceil(shortestSession[1]*10)%10];
        rowsLongest = [Math.ceil(longestSession[1]), Math.ceil(longestSession[1]*10)%10];
        if (rowsShortest[1] === 0) rowsShortest[1] = 10;
        if (rowsLongest[1] === 0) rowsLongest[1] = 10;
        console.log(table.getString(shortestSession[0], 2), rowsShortest[0], rowsShortest[1],
            table.getString(longestSession[0], 2),rowsLongest[0], rowsLongest[1]);

        /*canvas = sketch.createCanvas(sketch.windowWidth, rows*hourglassH+30);
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
        sketch.text("Najdaljša seja", 0, 0, sketch.windowWidth, 30);*/

        sketch.createCanvasAndDrawHourglasses();

        counterShortest = 0;
        shownShortest = 0;
        counterLongest = 0;
        shownLongest = 0;
    }

    sketch.draw = function() {
        sketch.frameRate(20);
        for(let i = 0; i < rowsShortest[0]; i++) {
            if (i*hourglassH < sketch.mouseY) {
                shownShortest = (i+1)*10;
            }
        }
        if (counterShortest < Math.min(shownShortest, (rowsShortest[0]-1)*10+rowsShortest[1])) {
            sketch.image(full, sketch.windowWidth/4+hourglassW*(counterShortest%10),
                30+hourglassH*Math.floor(counterShortest/10), hourglassW, hourglassH);
            counterShortest++;
        }
        for(let i = 0; i < rowsLongest[0]; i++) {
            if (i*hourglassH < sketch.mouseY) {
                shownLongest = (i+1)*10;
            }
        }
        if (counterLongest < Math.min(shownLongest, (rowsLongest[0]-1)*10+rowsLongest[1])) {
            sketch.image(full, sketch.windowWidth/4+hourglassW*(counterLongest%10),
                (hourglassH*rowsShortest[0]+80)+hourglassH*Math.floor(counterLongest/10), hourglassW, hourglassH);
            counterLongest++;
        }
    }

    sketch.createCanvasAndDrawHourglasses = function() {
        hourglassW = sketch.windowWidth/20;
        hourglassH = hourglassW*164/116;

        canvas = sketch.createCanvas(sketch.windowWidth, (rowsShortest[0]+rowsLongest[0])*hourglassH+80);
        canvas.parent("longest_session");

        for(let i = 0; i < rowsShortest[0]; i++) {
            for(let j = 0; j < 10; j++) {
                sketch.image(empty, sketch.windowWidth/4+hourglassW*j, 30+hourglassH*i, hourglassW, hourglassH);
            }
        }
        for(let i = 0; i < rowsLongest[0]; i++) {
            for(let j = 0; j < 10; j++) {
                sketch.image(empty, sketch.windowWidth/4+hourglassW*j,
                    (hourglassH*rowsShortest[0]+80)+hourglassH*i, hourglassW, hourglassH);
            }
        }

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Najkrajša seja", 0, 0, sketch.windowWidth, 30);
        sketch.text("Najdaljša seja", 0, hourglassH*rowsShortest[0]+50, sketch.windowWidth, 30);
    }

    sketch.windowResized = function() {
        sketch.createCanvasAndDrawHourglasses();
        if(counterShortest === (rowsShortest[0]-1)*10+rowsShortest[1]) {
            for(let i = 0; i < (rowsShortest[0]-1)*10+rowsShortest[1]; i++) {
                sketch.image(full, sketch.windowWidth/4+hourglassW*(i%10),
                    30+hourglassH*Math.floor(i/10), hourglassW, hourglassH);
            }
        }
        if(counterLongest === (rowsLongest[0]-1)*10+rowsLongest[1]) {
            for(let i = 0; i < (rowsLongest[0]-1)*10+rowsLongest[1]; i++) {
                sketch.image(full, sketch.windowWidth/4+hourglassW*(i%10),
                    (hourglassH*rowsShortest[0]+80)+hourglassH*Math.floor(i/10), hourglassW, hourglassH);
            }
        }
    }

};

new p5(s3);