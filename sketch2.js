const s2 = ( sketch ) => {

    var xml;
    var canvas;
    var sentence;
    var len;
    var average;
    var countSentences;
    var averageSentence;

    sketch.preload = function() {
        xml = sketch.loadXML("data/seja.xml");
    }

    sketch.setup = function() {
        canvas = sketch.createCanvas(sketch.windowWidth, 400);
        canvas.parent('canvas2');

        var children = xml.getChild("text").getChild("body").getChildren("div");
        var longestSentence = "test";
        len = 0;

        var actual_words = [];
        countSentences = 0;
        average = 0;

        for(var i = 0; i < children.length; i++) {
            var type = children[i].getString("type");

            if (type == "sp") {
                var speaker = children[i];
                var utterance = speaker.getChildren("u");

                for (var j = 0; j < utterance.length; j++) {
                    var sentences = utterance[j].getChildren("s");
                    countSentences += sentences.length;

                    for(var k = 0; k < sentences.length; k++) {
                        var words = sentences[k].getChildren("w");
                        average += words.length;

                        for(var l = 0; l < words.length; l++) {
                            actual_words[l] = words[l].getContent();
                        }

                        if (words.length > len) {
                            longestSentence = sentences[k].getChildren();
                            //longestSentence = actual_words;
                            len = words.length;
                        }
                    }
                }
            }
        }
        average = Math.round(average/countSentences);
        console.log(countSentences, average);
        sentence = "";
        for(let i = 0; i < longestSentence.length; i++) {
            sentence += longestSentence[i].getContent();
            //sentence += " "
            //console.log(longestSentence[i]);
        }
        //console.log(sentence);
        //console.log("len: " + len);
        averageSentence = sketch.findAverageSentence();
        sketch.writeText();
    }

    sketch.draw = function() {
    }

    sketch.windowResized = function() {
        sketch.textAlign(sketch.CENTER, sketch.UP);
        sketch.background("#FFFFFF");
        sketch.writeText();

    }

    sketch.writeText = function() {
        sketch.textFont("Courier");
        sketch.textAlign(sketch.CENTER, sketch.UP);
        sketch.fill("#000000");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.text("Najdaljši stavek", 0, 0, sketch.windowWidth, 30);
        sketch.textSize(16);
        sketch.textStyle(sketch.NORMAL);
        sketch.text("Dolžina povprečnega stavka: " + average + " besed", 0, 30, sketch.windowWidth, 20);
        if (averageSentence !== null) {
            sketch.textStyle(sketch.ITALIC);
            sketch.fill("#555555");
            sketch.text("\" " + averageSentence + " \"", 10, 60, sketch.windowWidth-20, 340);
            sketch.textStyle(sketch.NORMAL);
            sketch.fill("#000000");
            sketch.text("Dolžina najdaljšega stavka: " + len + " besed", 0, 120, sketch.windowWidth, 20);
            sketch.textStyle(sketch.ITALIC);
            sketch.fill("#555555");
            sketch.text("\" " + sentence + " \"", 10, 150, sketch.windowWidth - 20, 250);

        }
        else {
            sketch.text("Dolžina najdaljšega stavka: " + len + " besed", 0, 55, sketch.windowWidth, 20);
            sketch.textStyle(sketch.ITALIC);
            sketch.fill("#555555");
            sketch.text("\" " + sentence + " \"", 10, 85, sketch.windowWidth - 20, 315);
        }
    }

    sketch.findAverageSentence = function() {
        var children = xml.getChild("text").getChild("body").getChildren("div");

        for(var i = 0; i < children.length; i++) {
            var type = children[i].getString("type");

            if (type === "sp") {
                var speaker = children[i];
                var utterance = speaker.getChildren("u");

                for (var j = 0; j < utterance.length; j++) {
                    var sentences = utterance[j].getChildren("s");
                    countSentences += sentences.length;

                    for(var k = 0; k < sentences.length; k++) {
                        var words = sentences[k].getChildren("w");

                        if (words.length === average) {
                            let signs = sentences[k].getChildren();
                            let sentence = "";
                            for(let l = 0; l < signs.length; l++) {
                                sentence += signs[l].getContent();
                            }
                            return sentence;
                        }
                    }
                }
            }
        }
    }
};

new p5(s2);