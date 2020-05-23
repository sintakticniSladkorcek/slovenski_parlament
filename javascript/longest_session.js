const s3 = ( sketch ) => {
    var full;
    var empty;
    var table;
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
    var shortestSessionHours;
    var shortestSessionMinutes;
    var longestSession;
    var longestSessionHours;
    var longestSessionMinutes;
    var inRow;
    var startOfGraph;
    var scale;
    var noData;

    sketch.preload = function() {
        // 116x164 images
        full = sketch.loadImage("pictures/hourglass.png");
        empty = sketch.loadImage("pictures/hourglass1.png");
        scale = sketch.loadImage("pictures/scale.png");
        table = sketch.loadTable("parsed_data/session_duration/session_duration.csv");
    }

    sketch.setup = function() {
        inRow = 12;

        noData = 0;
        shortestSession = [0, 100];
        longestSession = [0, 0];
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
            if(current == 0){
                noData += 1;
            }
        }
        let minutes = Math.ceil(parseInt(table.getString(shortestSession[0], 1))/300);
        rowsShortest = [Math.ceil(minutes/inRow), Math.ceil(minutes%inRow)];
        minutes = Math.ceil(parseInt(table.getString(longestSession[0], 1))/300);
        rowsLongest = [Math.ceil(minutes/inRow), Math.ceil(minutes%inRow)];
        if (rowsShortest[1] === 0) rowsShortest[1] = inRow;
        if (rowsLongest[1] === 0) rowsLongest[1] = inRow;
        
        // shortest session length in hours and minutes
        let seconds = parseInt(table.getString(shortestSession[0], 1))
        shortestSessionHours = Math.floor(seconds / 3600);
        let remainder = seconds - (shortestSessionHours * 3600)
        shortestSessionMinutes = remainder / 60;

        // longest session length in hours and minutes
        seconds = parseInt(table.getString(longestSession[0], 1))
        longestSessionHours = Math.floor(seconds / 3600);
        remainder = seconds - (longestSessionHours * 3600)
        longestSessionMinutes = remainder / 60;

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
                shownShortest = (i+1)*inRow;
            }
        }
        if (counterShortest < Math.min(shownShortest, (rowsShortest[0]-1)*inRow+rowsShortest[1])) {
            sketch.image(full, sketch.windowWidth/4+hourglassW*(counterShortest%inRow),
                30+hourglassH*Math.floor(counterShortest/inRow)+startOfGraph, hourglassW, hourglassH);
            counterShortest++;
        }
        for(let i = 0; i < rowsLongest[0]; i++) {
            if (i*hourglassH < sketch.mouseY) {
                shownLongest = (i+1)*inRow;
            }
        }
        if (counterLongest < Math.min(shownLongest, (rowsLongest[0]-1)*inRow+rowsLongest[1])) {
            sketch.image(full, sketch.windowWidth/4+hourglassW*(counterLongest%inRow),
                (hourglassH*rowsShortest[0]+100)+hourglassH*Math.floor(counterLongest/inRow)+startOfGraph, hourglassW, hourglassH);
            counterLongest++;
        }
    }

    sketch.createCanvasAndDrawHourglasses = function() {
        hourglassW = sketch.windowWidth/(2*inRow);
        hourglassH = hourglassW*164/116;
        startOfGraph = 90+hourglassH/2;

        canvas = sketch.createCanvas(sketch.windowWidth, (rowsShortest[0]+rowsLongest[0])*hourglassH+100+startOfGraph);
        canvas.parent("longest_session");

        for(let i = 0; i < rowsShortest[0]; i++) {
            for(let j = 0; j < inRow; j++) {
                sketch.image(empty, sketch.windowWidth/4+hourglassW*j, 30+hourglassH*i+startOfGraph, hourglassW, hourglassH);
            }
        }
        for(let i = 0; i < rowsLongest[0]; i++) {
            for(let j = 0; j < inRow; j++) {
                sketch.image(empty, sketch.windowWidth/4+hourglassW*j,
                    (hourglassH*rowsShortest[0]+100)+hourglassH*i+startOfGraph, hourglassW, hourglassH);
            }
        }

        sketch.textFont("Courier");
        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(14);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        let helper_string = "minut";
        let my_string = "Tu lahko vidiš, kako dolga je bila najdaljša izmed sej v primerjavi z najkrajšo. Najdaljša izmed vseh sej je trajala ";
        if(longestSessionHours > 0){
            my_string += longestSessionHours;
            my_string += " ur in ";
        }
        my_string += longestSessionMinutes;
        if(longestSessionMinutes == 1){
            helper_string += "o";
        } else if(longestSessionMinutes == 2){
            helper_string += "i";
        } else if(longestSessionMinutes == 3 || longestSessionMinutes == 4){
            helper_string += "e";
        }
        my_string += " " + helper_string + ", najkrajša pa ";

        helper_string = "minut";
        if(shortestSessionHours > 0){
            my_string += shortestSessionHours;
            my_string += " ur in ";
        }
        my_string += shortestSessionMinutes;
        if(shortestSessionMinutes == 1){
            helper_string += "o";
        } else if(shortestSessionMinutes == 2){
            helper_string += "i";
        } else if(shortestSessionMinutes == 3 || shortestSessionMinutes == 4){
            helper_string += "e";
        }
        my_string += " " + helper_string + ". Za " + noData + " sej ni bilo podatka o njihovem trajanju.";

        sketch.text(my_string, sketch.windowWidth/4, 0, sketch.windowWidth/2, 70);
        sketch.image(scale, sketch.windowWidth/2-hourglassH*392/656, 70, hourglassH*392/328, hourglassH/2);
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.text("Najkrajša seja", 0, startOfGraph, sketch.windowWidth, 30);
        sketch.text("Najdaljša seja", 0, hourglassH*rowsShortest[0]+70+startOfGraph, sketch.windowWidth, 30);
    }

    sketch.windowResized = function() {
        sketch.createCanvasAndDrawHourglasses();
        if(counterShortest === (rowsShortest[0]-1)*inRow+rowsShortest[1]) {
            for(let i = 0; i < (rowsShortest[0]-1)*inRow+rowsShortest[1]; i++) {
                sketch.image(full, sketch.windowWidth/4+hourglassW*(i%inRow),
                    30+hourglassH*Math.floor(i/inRow)+startOfGraph, hourglassW, hourglassH);
            }
        }
        if(counterLongest === (rowsLongest[0]-1)*inRow+rowsLongest[1]) {
            for(let i = 0; i < (rowsLongest[0]-1)*inRow+rowsLongest[1]; i++) {
                sketch.image(full, sketch.windowWidth/4+hourglassW*(i%inRow),
                    (hourglassH*rowsShortest[0]+100)+hourglassH*Math.floor(i/inRow)+startOfGraph, hourglassW, hourglassH);
            }
        }
    }

    sketch.mouseClicked = function() {
    }
};

new p5(s3);