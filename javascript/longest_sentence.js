const s2 = ( sketch ) => {

    var longestSentences;
    var averageSentences;
    var canvas;
    var longestSentence;
    var longest;
    var averageSentence;
    var average;
    var countSentences;
    var textBoxHeight1;
    var textBoxHeight2;
    var width;
    var currentSessionId;

    sketch.preload = function() {
        longestSentences = sketch.loadTable("parsed_data/sentences/longest_sentences.csv");
        averageSentences = sketch.loadTable("parsed_data/sentences/average_sentences.csv");
    }

    sketch.setup = function() {

        width = sketch.windowWidth;

        longest = 0;

        countSentences = 0;
        average = 0;
        sentence = "";

        currentSessionId = getCurrentSessionId();
        sketch.findAverageAndLongestSentence();
        sketch.writeText();
    }

    sketch.draw = function() {
        if(currentSessionId !== getCurrentSessionId()) {
            currentSessionId = getCurrentSessionId();
            sketch.findAverageAndLongestSentence();
            sketch.writeText();
        }
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
        textBoxHeight2 = parseInt(longest)*2+40;

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

        sketch.text("Dolžina povprečne povedi te seje: " + average + " besed", 0, 30, width, 20);
        sketch.textStyle(sketch.ITALIC);
        sketch.fill("#555555");
        sketch.text("\" " + averageSentence + " \"", 10, 60, width-20, 60+textBoxHeight1);
        sketch.textStyle(sketch.NORMAL);
        sketch.fill("#000000");

        sketch.text("Dolžina najdaljše povedi te seje: " + longest + " besed", 0, textBoxHeight1+90, width, textBoxHeight1+100);
        sketch.textStyle(sketch.ITALIC);
        sketch.fill("#555555");
        sketch.text("\" " + longestSentence + " \"", 10, textBoxHeight1+120, width - 20, textBoxHeight1+textBoxHeight2+100);
    }

    sketch.findAverageAndLongestSentence = function() {
        if(currentSessionId == 608) {
            average = 0;
            longest = 0;
            for(let i = 0; i < longestSentences.getRowCount(); i++) {
                average += parseFloat(averageSentences.getString(i, 1));
                let l = parseInt(longestSentences.getString(i, 1));
                if(longest < l && l < 500) {
                    longest = l;
                    longestSentence = longestSentences.getString(i, 2);
                }
            }
            average = Math.round(average/longestSentences.getRowCount());
            for(let i = 0; i < averageSentences.getRowCount(); i++) {
                if(average === Math.round(averageSentences.getString(i, 1))) {
                    averageSentence = averageSentences.getString(i, 2);
                    return;
                }
            }
        } else {
            average = parseInt(averageSentences.getString(currentSessionId, 1));
            averageSentence = averageSentences.getString(currentSessionId, 2);
            longest = longestSentences.getString(currentSessionId, 1);
            longestSentence = longestSentences.getString(currentSessionId, 2);
        }
    }
};

new p5(s2);