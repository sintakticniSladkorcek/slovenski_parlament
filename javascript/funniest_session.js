const s8 = ( sketch ) => {

    var canvas;
    var table;
    var laughter;
    var w;

    sketch.preload = function() {
        table = sketch.loadTable("parsed_data/events/list_of_all_different_events.csv");
    }

    sketch.setup = function() {
        laughter = 0;
        for(let i = 0; i < table.getRowCount(); i++) {
            let str = table.getString(i, 0);
            if (str.includes("smeh") || str.includes("Smeh")) {
                laughter++;
            }
        }
        //console.log("smeh:", laughter);

        sketch.createCanvasAndWriteTitle();
    }

    sketch.draw = function() {

    }

    sketch.windowResized = function() {
        sketch.createCanvasAndWriteTitle();
    }

    sketch.createCanvasAndWriteTitle = function() {
        w = sketch.windowWidth;
        if(w > 1000) w = w/2;
        canvas = sketch.createCanvas(w, 50);
        canvas.parent("funniest_session");

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        //sketch.text("Seja z največ smeha", 0, 0, w, 50);
    }

};

new p5(s8);