var canvas;
var sessionsPerSpeaker;
var speechesPerSpeaker;
var wordsPerSpeaker;
var podium;
var presidents;
var presidents_table;

let speakersSession = [];
let dataSession = [];
let speakersSpeech = [];
let dataSpeech = [];
let speakersWords = [];
let dataWords = [];

const s7 = ( sketch ) => {

    sketch.preload = function() {
        sessionsPerSpeaker = sketch.loadTable("parsed_data/speakers/number_of_sessions_per_speaker.csv");
        speechesPerSpeaker = sketch.loadTable("parsed_data/speakers/number_of_speeches_per_speaker.csv");
        wordsPerSpeaker = sketch.loadTable("parsed_data/speakers/number_of_words_per_speaker.csv");
        podium = sketch.loadImage("pictures/podium.jpg");
        presidents_table = sketch.loadTable("parsed_data/presidents/all_presidents.csv");
    }

    sketch.setup = function() {

        setData();
        sketch.createNewCanvas();
        drawEverything(sketch);
    }

    sketch.createNewCanvas = function() {
        imgW = 380;
        imgH = 330;

        canvas = sketch.createCanvas(imgW, 270+3*imgH);
        canvas.parent("popular_speaker");
    };

    

    // sketch.createCanvasAndDraw = function() {
    //     imgW = 380;
    //     imgH = 330;

    //     w = sketch.windowWidth;
    //     if(w > 1000) w /= 2;

    //     canvas = sketch.createCanvas(imgW, 240+3*imgH);
    //     canvas.parent("popular_speaker");

    //     sketch.textFont("Courier");
    //     sketch.textStyle(sketch.BOLD);
    //     sketch.textSize(24);
    //     sketch.textAlign(sketch.CENTER, sketch.CENTER);
    //     sketch.text("Govorci na največ sejah", 0, 0, imgW, 30);
    //     sketch.drawPodium(speakersSession, dataSession, 0, 0);

    //     sketch.textStyle(sketch.BOLD);
    //     sketch.textSize(24);
    //     sketch.text("Govorci z največ govori", 0, 50+imgH, imgW, 30);
    //     sketch.drawPodium(speakersSpeech, dataSpeech, 0, 30+20+imgH);

    //     sketch.textStyle(sketch.BOLD);
    //     sketch.textSize(24);
    //     sketch.text("Govorci z največ izgovorjenimi besedami", 0, 100+2*imgH, imgW, 30);
    //     sketch.drawPodium(speakersWords, dataWords, 0, 60+40+2*imgH);

    //     sketch.textStyle(sketch.NORMAL);
    //     sketch.textSize(16);
    //     sketch.text("OPOMBA: Govorci na stopničkah so bili tudi predsedujoči na večih sejah. Ker predsedujoči vodi sejo, pride do besede občutno večkrat kot ostali govorci na seji.", 0, 150+3*imgH, imgW, 70);
    // }

    /*sketch.mouseClicked = function() {
        console.log(sketch.mouseX, sketch.mouseY);
    }*/

    sketch.windowResized = function() {
        //sketch.createCanvasAndDraw();
    }

    sketch.drawPodium = function(text, data, offsetX, offsetY) {
        let height2 = 143*(data[1]/data[0]);
        let height3 = 143*(data[2]/data[0]);
        sketch.fill("#000000");
        //console.log(data, data[1]/data[0], data[2]/data[0]);
        sketch.rect(offsetX, offsetY+310, 380, 20);
        sketch.rect(offsetX+245.5, offsetY+307-height3, 105, height3);
        sketch.rect(offsetX+245.5, offsetY+292-height3, 113, 12);
        sketch.rect(offsetX+29.5, offsetY+307-height2, 105, height2);
        sketch.rect(offsetX+21.5, offsetY+292-height2, 113, 12);
        sketch.rect(offsetX+137.5, offsetY+164, 105, 143);
        sketch.rect(offsetX+129.5, offsetY+149, 121, 12);
        sketch.fill("#FFFFFF");
        sketch.circle(offsetX+190, offsetY+235.5, 50);
        sketch.circle(offsetX+82, offsetY+307-height2/2, 50);
        sketch.circle(offsetX+298, offsetY+307-height3/2, 50);
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(30);
        sketch.fill("#000000");
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text(" 1", offsetX+137.5, offsetY+164, 105, 143);
        sketch.text(" 2", offsetX+29.5, offsetY+307-height2, 105, height2);
        sketch.text(" 3", offsetX+245.5, offsetY+307-height3, 105, height3);
        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.rectMode(sketch.CENTER);
        sketch.text(text[1] + " " + data[1], offsetX+82, offsetY+242-height2, 105, 100);
        sketch.text(text[0] + " " + + data[0], offsetX+190, offsetY+89, 105, 100);
        sketch.text(text[2] + " " + + data[2], offsetX+298, offsetY+242-height3, 105, 100);
        sketch.rectMode(sketch.CORNER);
    }

};



function setData(){
    /* Transform the array in a dict */
    presidents = {};
    for(var i = 0; i < presidents_table.getRowCount(); i++){
        presidents[presidents_table.get(i, 0) + ":"]="";
    } 

    speakersSession = [];
    dataSession = [];
    speakersSpeech = [];
    dataSpeech = [];
    speakersWords = [];
    dataWords = [];

    let counter = 0;
    let index = 0;

    let person;
    let data;
    if(getSpeakerMode()){ // display presidents
        // speakers by number of sessions
        while(counter < 3){
            person = sessionsPerSpeaker.get(index, 0);
            data = sessionsPerSpeaker.get(index, 1);

            if(person in presidents){
                speakersSession.push(person);
                dataSession.push(data);
                counter = counter + 1;
            }
            index = index + 1;
        }
        // speakers by number of speeches
        counter = 0;
        index = 0;
        while(counter < 3){
            person = speechesPerSpeaker.get(index, 0);
            data = speechesPerSpeaker.get(index, 1);

            if(person in presidents){
                speakersSpeech.push(person);
                dataSpeech.push(data);
                counter = counter + 1;
            }
            index = index + 1;
        }
        // speakers by number of words
        counter = 0;
        index = 0;
        while(counter < 3){
            person = wordsPerSpeaker.get(index, 0);
            data = wordsPerSpeaker.get(index, 1);

            if(person in presidents){
                speakersWords.push(person);
                dataWords.push(data);
                counter = counter + 1;
            }
            index = index + 1;
        }
        
    } else { // display non-presidents
        // speakers by number of sessions
        while(counter < 3){
            person = sessionsPerSpeaker.get(index, 0);
            data = sessionsPerSpeaker.get(index, 1);

            if(!(person in presidents)){
                speakersSession.push(person);
                dataSession.push(data);
                counter = counter + 1;
            }
            index = index + 1;
        }
        // speakers by number of speeches
        counter = 0;
        index = 0;
        while(counter < 3){
            person = speechesPerSpeaker.get(index, 0);
            data = speechesPerSpeaker.get(index, 1);

            if(!(person in presidents)){
                speakersSpeech.push(person);
                dataSpeech.push(data);
                counter = counter + 1;
            }
            index = index + 1;
        }
        // speakers by number of words
        counter = 0;
        index = 0;
        while(counter < 3){
            person = wordsPerSpeaker.get(index, 0);
            data = wordsPerSpeaker.get(index, 1);

            if(!(person in presidents)){
                speakersWords.push(person);
                dataWords.push(data);
                counter = counter + 1;
            }
            index = index + 1;
        }
    }
}

function drawEverything(sketch) {
    imgW = 380;
    imgH = 330;

    w = sketch.windowWidth;
    if(w > 1000) w /= 2;
    sketch.textFont("Courier");
    sketch.textStyle(sketch.BOLD);
    sketch.textSize(24);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.text("Govorci na največ sejah", 0, 0, imgW, 30);
    sketch.drawPodium(speakersSession, dataSession, 0, 0);

    sketch.textStyle(sketch.BOLD);
    sketch.textSize(24);
    sketch.text("Govorci z največ govori", 0, 50+imgH, imgW, 30);
    sketch.drawPodium(speakersSpeech, dataSpeech, 0, 30+20+imgH);

    sketch.textStyle(sketch.BOLD);
    sketch.textSize(24);
    sketch.text("Govorci z največ izgovorjenimi besedami", 0, 100+2*imgH, imgW, 30);
    sketch.drawPodium(speakersWords, dataWords, 0, 60+40+2*imgH);

    sketch.textStyle(sketch.NORMAL);
    sketch.textSize(16);
    sketch.text("OPOMBA: Predsedujoči govorci na stopničkah so ločeni od preostalih, saj močno odstopajo po rezultatih. Ker predsedujoči vodi sejo, pride do besede občutno večkrat kot ostali govorci na seji. Tako ima več govorov in izgovori več besed.", 0, 150+3*imgH, imgW, 100);

};

speakers_sketch = new p5(s7);