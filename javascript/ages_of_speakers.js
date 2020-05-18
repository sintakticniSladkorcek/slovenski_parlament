const s6 = ( sketch ) => {

    var table;
    var canvas;
    var youngest;
    var oldest;

    sketch.preload = function() {
        table = sketch.loadTable("parsed_data/speakers/ages_of_speakers.csv");
    }

    sketch.setup = function() {
        youngest = [0, 100];
        oldest = [0, 0];
        //console.log(oldest, youngest);
        for(let i = 0; i < table.getRowCount(); i++) {
            let currentOldest = sketch.findMatch(table.getString(i, 3), table.getString(i, 1));
            let currentYoungest = sketch.findMatch(table.getString(i, 3), table.getString(i, 2));
            if(parseInt(currentOldest[1]) > oldest[1]) {
                oldest[0] = currentOldest[0];
                oldest[1] = parseInt(currentOldest[1]);
            }
            if(parseInt(currentYoungest) < youngest[1]) {
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
        canvas = sketch.createCanvas(sketch.windowWidth, 50);
        canvas.parent("ages_of_speakers");

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Najstarejši in najmlajši govorec", 0, 0, sketch.windowWidth, 30);
    }

    sketch.findMatch = function(array, match) {
        //console.log(array, match);
        for(let i = 0; i < array.length; i++) {
            if(array[i] === match[0]) return array[i];
        }
        return [0, 50];
    }
};

new p5(s6);