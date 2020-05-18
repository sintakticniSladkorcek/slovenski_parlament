const s6 = ( sketch ) => {

    var table;
    var canvas;
    var youngest;
    var oldest;

    sketch.preload = function() {
        table = sketch.loadTable("parsed_data/speakers/ages_of_speakers.csv");
    }

    sketch.setup = function() {
        youngest = [0, 1900];
        oldest = [0, 2000];
        //console.log(oldest, youngest);
        for(let i = 0; i < table.getRowCount(); i++) {
            let currentOldest = sketch.findMatch(stringToArray(table.getString(i, 3)), stringToArray(table.getString(i, 1)));
            let currentYoungest = sketch.findMatch(stringToArray(table.getString(i, 3)), stringToArray(table.getString(i, 2)));
            //console.log(currentYoungest);
            if(parseInt(currentOldest[1]) < oldest[1]) {
                oldest[0] = currentOldest[0];
                oldest[1] = parseInt(currentOldest[1]);
            }
            if(parseInt(currentYoungest[1]) > youngest[1]) {
                youngest[0] = currentYoungest[0];
                youngest[1] = parseInt(currentYoungest[1]);
            }
        }
        //console.log(oldest, youngest);

        sketch.createCanvasAndWriteSpeakers();

    }

    sketch.draw = function() {

    }

    sketch.createCanvasAndWriteSpeakers = function() {
        let w = sketch.windowWidth;
        if(w > 1000) w /= 2;

        canvas = sketch.createCanvas(w, 90);
        canvas.parent("ages_of_speakers");

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Najstarejši in najmlajši govorec", 0, 0, w, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(18);
        sketch.text(oldest[0] + ", " + (1991-oldest[1]), 0, 40, w, 25);
        sketch.text(youngest[0] + ", " + (1991-youngest[1]), 0, 65, w, 25);
    }

    sketch.findMatch = function(array, match) {
        //console.log(array, match);
        for(let i = 0; i < array.length; i++) {
            if(array[i] === match[0]) return [array[i], array[i+1]];
        }
        return [0, 50];
    }
};

new p5(s6);