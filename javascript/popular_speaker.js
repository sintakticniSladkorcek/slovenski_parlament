const s7 = ( sketch ) => {

    var canvas;
    var sessionsPerSpeaker;
    var speachesPerSpeaker;
    var wordsPerSpeaker;
    var podium;

    sketch.preload = function() {
        //sessionsPerSpeaker = sketch.loadTable("number_of_sessions_per_speaker.csv");
        //speachesPerSpeaker = sketch.loadTable("number_of_speeches_per_speaker.csv");
        //wordsPerSpeaker = sketch.loadTable("number_of_words_per_speaker.csv");
        podium = sketch.loadImage("pictures/podium.jpg");
    }

    sketch.setup = function() {
        sketch.createCanvasAndDraw();
    }

    sketch.createCanvasAndDraw = function() {
        imgW = sketch.windowWidth/2;
        imgH = imgW;

        canvas = sketch.createCanvas(imgW, 130+3*imgH);
        canvas.parent("popular_speaker");

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Največ sej", 0, 0, sketch.windowWidth/2, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.image(podium, 0, 30, imgW, imgH);
        //sketch.text(sessionsPerSpeaker(0, 0) + ", " + sessionsPerSpeaker(0, 1), 27, 137, 100, 20);
        //sketch.text(sessionsPerSpeaker(1, 0) + ", " + sessionsPerSpeaker(1, 1), 140, 107, 100, 20);
        //sketch.text(sessionsPerSpeaker(2, 0) + ", " + sessionsPerSpeaker(2, 1), 254, 177, 100, 20);

        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.text("Največ govorov", 0, 50+imgH, sketch.windowWidth/2, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.image(podium, 0, 80+imgH, imgW, imgH);
        //sketch.text(speachesPerSpeaker(0, 0) + ", " + speachesPerSpeaker(0, 1), 27, 137+80+imgH, 100, 20);
        //sketch.text(speachesPerSpeaker(1, 0) + ", " + speachesPerSpeaker(1, 1), 140, 107+80+imgH, 100, 20);
        //sketch.text(speachesPerSpeaker(2, 0) + ", " + speachesPerSpeaker(2, 1), 254, 177+80+imgH, 100, 20);

        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.text("Največ besed", 0, 100+2*imgH, sketch.windowWidth/2, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.image(podium, 0, 130+2*imgH, imgW, imgH);
        //sketch.text(wordsPerSpeaker(0, 0) + ", " + wordsPerSpeaker(0, 1), 27, 137+130+2*imgH, 100, 20);
        //sketch.text(wordsPerSpeaker(1, 0) + ", " + wordsPerSpeaker(1, 1), 140, 107+130+2*imgH, 100, 20);
        //sketch.text(wordsPerSpeaker(2, 0) + ", " + wordsPerSpeaker(2, 1), 254, 177+130+2*imgH, 100, 20);
    }

    sketch.mouseClicked = function() {
        //console.log(sketch.mouseX, sketch.mouseY);
    }

    sketch.windowResized = function() {
        sketch.createCanvasAndDraw();
    }

};

new p5(s7);