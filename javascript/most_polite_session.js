const s11 = ( sketch ) => {

    var table;
    var tables;
    var w;
    var sessions;

    sketch.preload = function() {
        table = sketch.loadTable("parsed_data/word_frequencies/word_frequencies_by_session.csv");
        sessions = table.getColumn(0);
        tables = [];
        for(let i = 0; i < sessions.length; i++) {
            table[i] = sketch.loadTable("parsed_data/word_frequencies/" + sessions[i] + ".csv");
        }
    }

    sketch.setup = function() {
        sketch.createCanvasAndTitle();
    }

    sketch.draw = function() {
    }


    sketch.createCanvasAndTitle = function() {
        w = sketch.windowWidth;
        if(w > 1000) w /= 2;

        canvas = sketch.createCanvas(w, 100);
        canvas.parent('most_polite_session');

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Najbolj vljudna seja", 0, 0, sketch.windowWidth, 30);
    }

    sketch.windowResized = function() {
        sketch.createCanvasAndTitle();
    }

}

new p5(s11);
