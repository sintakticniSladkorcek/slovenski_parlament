const s2 = ( sketch ) => {

    var longestSentences;
    var averageSentences;
    var canvas;
    var sentence;
    var len;
    var average;
    var averageSentence;
    var countSentences;
    var textBoxHeight1;
    var textBoxHeight2;
    var width;

    sketch.preload = function() {
        longestSentences = sketch.loadTable("parsed_data/sentences/longest_sentences.csv");
        averageSentences = sketch.loadTable("parsed_data/sentences/average_sentences.csv");
    }

    sketch.setup = function() {
        width = sketch.windowWidth;
        //textBoxHeight1 = (Math.floor((24000/sketch.windowWidth)/16)+1)*16;
        //textBoxHeight2 = (Math.floor((600000/sketch.windowWidth)/16)+1)*16;

        //canvas = sketch.createCanvas(sketch.windowWidth, 70+textBoxHeight1+textBoxHeight2);
        //canvas.parent('longest_sentence');

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
        width = sketch.windowWidth;
        if(width > 1000) width /= 2;

        textBoxHeight1 = (Math.floor((24000/width)/16)+1)*16;
        textBoxHeight2 = (Math.floor((600000/width)/16)+1)*16;

        canvas = sketch.createCanvas(width, 90+textBoxHeight1+textBoxHeight2);
        canvas.parent('longest_sentence');

        sketch.textFont("Courier");
        sketch.textAlign(sketch.CENTER, sketch.UP);
        sketch.fill("#000000");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.text("Najdaljša poved", 0, 0, width, 30);
        sketch.textSize(16);
        sketch.textStyle(sketch.NORMAL);

        sketch.text("Dolžina povprečne povedi: " + average + " besed", 0, 30, width, 20);
        sketch.textStyle(sketch.ITALIC);
        sketch.fill("#555555");
        sketch.text("\" " + averageSentence + " \"", 10, 60, width-20, 60+textBoxHeight1);
        sketch.textStyle(sketch.NORMAL);
        sketch.fill("#000000");

        sketch.text("Dolžina najdaljše povedi: " + len + " besed", 0, textBoxHeight1+90, width, textBoxHeight1+100);
        sketch.textStyle(sketch.ITALIC);
        sketch.fill("#555555");
        sketch.text("\" " + sentence + " \"", 10, textBoxHeight1+120, width - 20, textBoxHeight1+textBoxHeight2+100);
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

    /*sketch.findAverageSentence = function() {
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
    }*/
};

new p5(s2);