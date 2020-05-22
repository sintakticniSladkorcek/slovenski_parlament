const s7 = ( sketch ) => {

    var canvas;
    var sessionsPerSpeaker;
    var speachesPerSpeaker;
    var wordsPerSpeaker;
    var podium;

    sketch.preload = function() {
        sessionsPerSpeaker = sketch.loadTable("parsed_data/speakers/number_of_sessions_per_speaker.csv");
        speachesPerSpeaker = sketch.loadTable("parsed_data/speakers/number_of_speeches_per_speaker.csv");
        wordsPerSpeaker = sketch.loadTable("parsed_data/speakers/number_of_words_per_speaker.csv");
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
        sketch.rectMode(sketch.CENTER);
        sketch.text(sessionsPerSpeaker.get(0, 0) + ", " + sessionsPerSpeaker.get(0, 1), 85, 130, 110, 100);
        sketch.text(sessionsPerSpeaker.get(1, 0) + ", " + sessionsPerSpeaker.get(1, 1), 195, 105, 110, 100);
        sketch.text(sessionsPerSpeaker.get(2, 0) + ", " + sessionsPerSpeaker.get(2, 1), 312, 168, 110, 100);
        sketch.rectMode(sketch.CORNER);

        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.text("Največ govorov", 0, 50+imgH, sketch.windowWidth/2, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.image(podium, 0, 80+imgH, imgW, imgH);
        sketch.rectMode(sketch.CENTER);
        sketch.text(speachesPerSpeaker.get(0, 0) + ", " + speachesPerSpeaker.get(0, 1), 85, 130+50+imgH, 110, 100);
        sketch.text(speachesPerSpeaker.get(1, 0) + ", " + speachesPerSpeaker.get(1, 1), 195, 100+50+imgH, 110, 100);
        sketch.text(speachesPerSpeaker.get(2, 0) + ", " + speachesPerSpeaker.get(2, 1), 312, 168+50+imgH, 110, 100);
        sketch.rectMode(sketch.CORNER);

        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.text("Največ besed", 0, 100+2*imgH, sketch.windowWidth/2, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.image(podium, 0, 130+2*imgH, imgW, imgH);
        sketch.rectMode(sketch.CENTER);
        sketch.text(wordsPerSpeaker.get(0, 0) + ", " + wordsPerSpeaker.get(0, 1), 85, 130+100+2*imgH, 110, 100);
        sketch.text(wordsPerSpeaker.get(1, 0) + ", " + wordsPerSpeaker.get(1, 1), 195, 100+100+2*imgH, 110, 100);
        sketch.text(wordsPerSpeaker.get(2, 0) + ", " + wordsPerSpeaker.get(2, 1), 312, 168+100+2*imgH, 110, 100);
        sketch.rectMode(sketch.CORNER);
    }

    sketch.mouseClicked = function() {
        console.log(sketch.mouseX, sketch.mouseY);
    }

    sketch.windowResized = function() {
        sketch.createCanvasAndDraw();
    }

};

new p5(s7);