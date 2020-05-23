const s8 = ( sketch ) => {

    var canvas;
    var table;
    var laughter;
    var w;
    var seja;
    var funny_level;

    sketch.preload = function() {
        table = sketch.loadTable("parsed_data/events/laughter.csv");
    }

    sketch.setup = function() {
        // laughter = 0;
        // for(let i = 0; i < table.getRowCount(); i++) {
        //     let str = table.getString(i, 0);
        //     if (str.includes("smeh") || str.includes("Smeh")) {
        //         laughter++;
        //     }
        // }
        //console.log("smeh:", laughter);
        seja = table.get(0, 0);
        seja = sessionNameFormating(seja);
        funny_level = table.get(0, 1);

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

        canvas = sketch.createCanvas(w, 80);
        canvas.parent("funniest_session");

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Seja z največ smeha", 0, 0, w, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.text(seja, 0, 30, w, 20);

        my_string = "SMEH: " + funny_level + "-krat";
        sketch.text(my_string, 0, 55, w, 20);
    }

};

new p5(s8);