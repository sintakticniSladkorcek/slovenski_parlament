const s9 = ( sketch ) => {

    var canvas;
    var table;
    var w;

    sketch.preload = function() {
        table = sketch.loadTable("parsed_data/events/list_of_all_different_events.csv");
    }

    sketch.setup = function() {

        sketch.createCanvasAndWriteTitle();
    }

    sketch.draw = function() { }

    sketch.mouseClicked = function() {
        sketch.background("#FFFFFF");
        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(20);
        let random = Math.floor(Math.random() * table.getRowCount());
        sketch.text(table.getString(random, 0), 0, 0, w, 50);
    }

    sketch.windowResized = function() {
        sketch.createCanvasAndWriteTitle();
    }

    sketch.createCanvasAndWriteTitle = function() {
        w = sketch.windowWidth;
        if(w > 1000) w = w/2;
        canvas = sketch.createCanvas(w, 50);
        canvas.parent("random_incident");

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Klikni za incident", 0, 0, w, 50);
    }

};

new p5(s9);