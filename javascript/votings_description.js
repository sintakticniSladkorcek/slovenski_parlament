const s14 = ( sketch ) => {

    var canvas;
    var w;

    sketch.setup = function() {
        sketch.drawDescription();
    }

    sketch.windowResized = function() {
        sketch.drawDescription();
    }

    sketch.drawDescription = function() {
        w = sketch.windowWidth;
        if(w > 1000) w /= 2;

        canvas = sketch.createCanvas(w, 40);
        canvas.parent("votings_description");

        sketch.textFont("Courier");
        sketch.textSize(14);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Postavi se na krogec in poglej pri kateri seji je bilo toliko glasovanj. Pri sejah z več kot 500 glasovanji se bo prikazalo tudi točno število.",
            0, 0, w, 40);
    }
}

new p5(s14);