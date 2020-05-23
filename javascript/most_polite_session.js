const s11 = ( sketch ) => {

    var table;
    var w;
    var seja;
    var politeness;

    sketch.preload = function() {
        table = sketch.loadTable("parsed_data/politeness/polite_sessions.csv");
    }

    sketch.setup = function() {
        seja = table.get(0, 0);
        seja = sessionNameFormating(seja);
        politeness = table.get(0, 1);

        sketch.createCanvasAndWriteTitle();
    }

    sketch.draw = function() {
    }


    sketch.createCanvasAndWriteTitle = function() {
        w = sketch.windowWidth;
        if(w > 1000) w = w/2;

        canvas = sketch.createCanvas(w, 80);
        canvas.parent('most_polite_session');

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Najbolj vljudna seja", 0, 0, w, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.text(seja, 0, 30, w, 20);

        my_string = "ŠTEVILO VLJUDNIH BESED: " + politeness;
        sketch.text(my_string, 0, 55, w, 20);
    }

    sketch.windowResized = function() {
        sketch.createCanvasAndWriteTitle();
    }

}

new p5(s11);
