const sL = ( sketch ) => {

    var fi;
    var center;

    sketch.setup = function() {
        let canvas = sketch.createCanvas(innerWidth, innerHeight);
        canvas.parent("p5_loading");
        sketch.background("#A0A0A0");
        sketch.textFont("Courier");
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.textSize(18);
        sketch.textStyle(sketch.BOLD);
        center = [sketch.windowWidth/2, sketch.windowHeight/2];
        sketch.text("Loading...", center[0]-30, center[1]-10, 60, 20);
        fi = 0;
        sketch.noStroke();
    }

    sketch.draw = function() {
        sketch.frameRate(30);
        sketch.fill("#A0A0A0");
        sketch.circle(center[0] + 100 * Math.cos((fi-100) * Math.PI / 180), center[1] + 100 * Math.sin((fi-100) * Math.PI / 180), 30);
        for(let i = 0; i < 5; i++) {
            sketch.fill(200+i*30, 0, 0);
            sketch.circle(center[0] + 100 * Math.cos((fi-i*20) * Math.PI / 180), center[1] + 100 * Math.sin((fi-i*20) * Math.PI / 180), 20);
        }
        fi += 20;
    }
}

new p5(sL);