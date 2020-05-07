var xml;
var canvas1;
var w;
var h;
var img;

function preload() {
    xml = loadXML("data/seja.xml");
    img = loadImage("parlament2.jpg");
}

function setup() {
    w = innerWidth;
    h = (w*1332)/3000;

    canvas1 = createCanvas(w, h);
    canvas1.parent('canvas1');

    var children = xml.getChild("text").getChild("body").getChildren("div");
    var longestSentence = "test";
    var len = 0;

    var actual_words = [];

    for(var i = 0; i < children.length; i++) {
        var type = children[i].getString("type");

        if (type == "sp") {
            var speaker = children[i];
            var utterance = speaker.getChildren("u");

            for (var j = 0; j < utterance.length; j++) {
                var sentences = utterance[j].getChildren("s");

                for(var k = 0; k < sentences.length; k++) {
                    var words = sentences[k].getChildren("w");
                    
                    for(var l = 0; l < words.length; l++) {
                        actual_words[l] = words[l].getContent();
                    }

                    if (words.length > len) {
                        //longestSentence = sentences[k].getChildren();
                        longestSentence = actual_words;
                        len = words.length;
                    } 
                }
            }
        }
    }
    let sentence = "";
    for(let i = 0; i < longestSentence.length; i++) {
        sentence += longestSentence[i];
        sentence += " "
        console.log(longestSentence[i]);
    }
    console.log(sentence);
    console.log("len: " + len);
    console.log("h, w: " + h, w);

    textFont("Courier");
    fill("#FF0000");
    textSize(36);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("Slovenski parlament med letoma 1990 in 1992", w/4, h/4, w/2, h/2);
}

function draw() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(i*(w/4) < mouseX && mouseX < (i+1)*(w/4) && j*(h/4) < mouseY && mouseY < (j+1)*(h/4)) {
                image(img, i*(w/4), j*(h/4), w/4, h/4, i*(3000/4), j*(1332/4), 3000/4, 1332/4);
                //text("Slovenski parlament med letoma 1990 in 1992", w/4, h/4, w/2, h/2);
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w = innerWidth;
    h = (w*1332)/3000;
    text("Slovenski parlament med letoma 1990 in 1992", w/4, h/4, w/2, h/2);
}