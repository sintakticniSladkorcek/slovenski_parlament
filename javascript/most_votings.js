const s10 = ( sketch ) => {

    var canvas;
    var table;
    var votings;
    var session;
    var rows;
    var w;
    var circles;
    var drawn;

    sketch.preload = function() {
        table = sketch.loadTable("parsed_data/events/votings.csv");
    }

    sketch.setup = function() {

        w = sketch.windowWidth;
        if(w > 1000) w /= 2;

        sketch.description();

        canvas = sketch.createCanvas(w, 260);
        canvas.parent("most_votings");

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Glasovanja", 0, 0, w, 30);


        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.rectMode(sketch.CENTER);

        rows = table.getRowCount();
        votings = parseInt(table.getString(0, 1));
        session = table.getString(0, 0);
        sketch.circle(0, 230-votings/4, 5);
        circles = [0, 230-votings/4];


        for(let i = 1; i < rows; i++) {
            let number = parseInt(table.getString(i, 1));
            sketch.stroke("#000000");
            //sketch.fill("#999999");
            sketch.circle(w/rows*i, 230-number/4, 5);
            sketch.stroke("#999999");
            sketch.line(w/rows*i, 230-number/4, w/rows*(i-1), circles[2*(i-1)+1]);
            circles.push(w/rows*i, 230-number/4);
            if(number > votings) {
                votings = number;
                session = table.getString(i, 0);
            }
        }
    }

    sketch.draw = function() {
        for(let i = 0; i < rows; i++) {
            let d = sketch.dist(sketch.mouseX, sketch.mouseY, circles[2 * i], circles[2 * i + 1]);
            if (d < 5) {
                sketch.fill("#FFFFFF");
                sketch.noStroke();
                sketch.rect(w/2, 250, w, 30);
                sketch.fill("#000000");
                let x = circles[2 * i];
                if(x < 275) x = 275;
                else if(x > w-275) x = w-275;
                //console.log(circles[2 * i], x);
                sketch.text(sessionNameFormating(table.getString(i, 0)), x, 250, 600, 16);
                if(parseInt(table.getString(i, 1)) > 500) {
                    sketch.text(table.getString(i, 1), circles[2*i]-17, circles[2*i+1]+8, 10, 10);
                }
            }
        }
    }

    sketch.drawText = function(i, d, text) {
        sketch.fill("#000000");
        sketch.text(text, circles[2 * i], circles[2 * i + 1] - 10, 100, 16);
        console.log("while loop started");
        while(sketch.dist(sketch.mouseX, sketch.mouseY, circles[2 * i], circles[2 * i + 1]) < 5) {
        }
        console.log("while loop ended");
        sketch.fill("#FFFFFF");
        sketch.text(text, circles[2 * i], circles[2 * i + 1] - 10, 300, 16);
        sketch.drawGraph();
        drawn = false;
    }

    sketch.drawGraph = function() {
        sketch.circle(0, 230-parseInt(table.getString(0, 1))/4, 5);
        let previous = 230-parseInt(table.getString(0, 1))/4;
        for(let i = 1; i < rows; i++) {
            let number = parseInt(table.getString(i, 1));
            sketch.circle(w/rows*i, 230-number/4, 5);
            sketch.line(w/rows*i, 230-number/4, w/rows*(i-1), previous);
        }
    }

    sketch.description = function() {
        let c = sketch.createCanvas(50, w);
        c.parent("votings_description");

        sketch.textFont("Courier");
        sketch.textSize(16);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Postavi se na krogec in poglej pri kateri seji je bilo toliko glasovanj. Pri sejah z več kot 500 glasovanji se bo prikazalo tudi točno število.",
            0, 0, w, 50);
    }

};

new p5(s10);