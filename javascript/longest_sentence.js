const s2 = ( sketch ) => {

    var longestSentences;
    var averageSentences;
    var canvas;
    var sentence;
    var len;
    var average;
    var averageSentence;
    var countSentences;

    sketch.preload = function() {
        longestSentences = sketch.loadTable("parsed_data/longest_sentences.csv");
        averageSentences = sketch.loadTable("parsed_data/average_sentences.csv");
    }

    sketch.setup = function() {
        canvas = sketch.createCanvas(sketch.windowWidth, 600);
        canvas.parent('longest_sentence');

        //var children = xml.getChild("text").getChild("body").getChildren("div");
        var longestSentence = "test";
        len = 0;

        var actual_words = [];
        countSentences = 0;
        average = 0;

        /*for(var i = 0; i < children.length; i++) {
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
        }*/

        //average = Math.round(average/countSentences);
        sentence = "";
        /*for(let i = 0; i < longestSentence.length; i++) {
            sentence += longestSentence[i].getContent();
            //sentence += " "
        }
        averageSentence = sketch.findAverageSentence();*/
        sketch.findAverageAndLongestSentence();
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
            sketch.text("\" " + sentence + " \"", 10, 150, sketch.windowWidth - 20, 450);

        }
        else {
            sketch.text("Dolžina najdaljšega stavka: " + len + " besed", 0, 55, sketch.windowWidth, 20);
            sketch.textStyle(sketch.ITALIC);
            sketch.fill("#555555");
            sketch.text("\" " + sentence + " \"", 10, 85, sketch.windowWidth - 20, 515);
        }
    }

    sketch.findAverageAndLongestSentence = function() {
        average = 0;
        len = 0;
        for(let i = 0; i < longestSentences.getRowCount(); i++) {
            average += parseFloat(averageSentences.getString(i, 1));
            let l = parseInt(longestSentences.getString(i, 1));
            if(len < l && l < 500) {
                len = l;
                sentence = longestSentences.getString(i, 2);
            }
        }
        average = Math.round(average/longestSentences.getRowCount());
        for(let i = 0; i < averageSentences.getRowCount(); i++) {
            if(average == Math.round(averageSentences.getString(i, 1))) {
                averageSentence = averageSentences.getString(i, 2);
                return;
            }
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