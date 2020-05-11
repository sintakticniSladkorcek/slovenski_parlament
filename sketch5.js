const s5 = ( sketch ) => {

    var xml;
    var selectMenu;
    var center;
    var zamik;
    var topWords;
    var position;

    sketch.preload = function() {
        xml = sketch.loadXML("data/seja.xml");
    }

    sketch.setup = function() {
        let canvas = sketch.createCanvas(sketch.windowWidth, 550);
        canvas.parent("canvas5");

        sketch.fill("#000000");
        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(18);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text(sketch.sessionName(), 0, 0, sketch.windowWidth-30, 50);

        /*let seja = sketch.sessionName();
        selectMenu = sketch.createSelect();
        selectMenu.position(10, 10);
        selectMenu.option(seja);
        selectMenu.selected(seja);
        selectMenu.changed(sketch.mySelectEvent);*/

        let c = sketch.windowWidth*3/8;
        center = [c, 300];
        zamik = [10, -10, -10, 10, 10, 10, -10, -10];

        sketch.drawSeats(80);

        sketch.fill(0);
        sketch.line(30, 530, sketch.windowWidth*3/4-30, 530);
        sketch.ellipse(30, 530, 10, 10);
        sketch.noLoop();
        topWords = ["", "", "", "", "", "", "", "", "", ""];
        sketch.countWords(1);
        sketch.drawWords();
    }

    sketch.draw = function() {
        sketch.frameRate(10);
        sketch.fill(255);
        sketch.noStroke();
        sketch.rect(0, 500,sketch.windowWidth*3/4, 50);
        sketch.fill(0);
        sketch.stroke(0);
        sketch.line(30, 530, sketch.windowWidth*3/4-30, 530);
        if(sketch.mouseX > 30 && sketch.mouseX < sketch.windowWidth*3/4-30) {
            sketch.ellipse(sketch.mouseX, 530, 10, 10);
            position = (sketch.mouseX-30)/(sketch.windowWidth*3/4-60);
        }
        else if (sketch.mouseX < 30){
            sketch.ellipse(30, 530, 10, 10);
            position = 0;
        }
        else {
            sketch.ellipse(sketch.windowWidth*3/4-30, 530, 10, 10);
            position = 1;
        }
    }

    sketch.mousePressed = function() {
        if (520 < sketch.mouseY && sketch.mouseY < 540) {
            sketch.loop();
        }
    }

    sketch.mouseReleased = function() {
        sketch.noLoop();
        sketch.countWords(position);
        sketch.drawWords();
    }

    sketch.drawSeats = function(number) {
        number = sketch.colorSeats(number);
        sketch.circle(center[0], center[1], 20);
        for(let j = 0; j < 4; j++) {
            for (let i = 0; i < 87; i++) {
                if (i % 15 === 0) {
                    number = sketch.colorSeats(number);
                    sketch.circle(zamik[j]+center[0]+Math.cos((90*j+i+7.5)*Math.PI/180)*100, zamik[j+4]+center[1]+Math.sin((90*j+i+7.5)*Math.PI/180)*100, 20);
                }
                if (i % 10 === 0) {
                    number = sketch.colorSeats(number);
                    sketch.circle(zamik[j]+center[0]+Math.cos((90*j+i+5)*Math.PI/180)*130, zamik[j+4]+center[1]+Math.sin((90*j+i+5)*Math.PI/180)*130, 20);
                }
                if (i % 8 === 0) {
                    number = sketch.colorSeats(number);
                    sketch.circle(zamik[j]+center[0]+Math.cos((90*j+i+5)*Math.PI/180)*160, zamik[j+4]+center[1]+Math.sin((90*j+i+5)*Math.PI/180)*160, 20);
                }
            }
        }
    }

    sketch.drawWords = function() {
        sketch.fill(255);
        sketch.noStroke();
        sketch.rect(sketch.windowWidth*3/4, 50,sketch.windowWidth/4, 500);
        sketch.fill(0);
        sketch.stroke(0);
        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        for(let i = 0; i < 10; i++) {
            sketch.text(topWords[i], sketch.windowWidth*3/4, i*30+150, sketch.windowWidth/4, 20);
        }
    }

    sketch.countWords = function(time) {
        let words = [];
        let countWords = [];
        let index = 0;
        let countTop = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        let children = xml.getChild("text").getChild("body").getChildren("div");

        for (let i = 0; i < children.length*time; i++) {
            var type = children[i].getString("type");

            if (type == "sp") {
                var speaker = children[i];
                var utterance = speaker.getChildren("u");

                for (var j = 0; j < utterance.length; j++) {
                    var sentences = utterance[j].getChildren("s");

                    for(var k = 0; k < sentences.length; k++) {
                        let sentenceWords = sentences[k].getChildren("w");

                        for(var l = 0; l < sentenceWords.length; l++) {
                            let lemma = sentenceWords[l].getString("lemma");
                            if(lemma.length > 3 && lemma != "biti") {
                                if (words.includes(sentenceWords[l].getString("lemma"))) {
                                    countWords[words.indexOf(sentenceWords[l].getString("lemma"))]++;
                                }
                                else {
                                    //console.log(sentenceWords[l], sentenceWords[l].getString("lemma"));
                                    words[index] = sentenceWords[l].getString("lemma");
                                    countWords[index] = 1;
                                    index++;
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(time, words);
        for (let i = 0; i < words.length; i++) {
            if(countTop[9] < countWords[i]) {
                topWords[9] = words[i];
                countTop[9] = countWords[i];
                let j = 9;
                while(j > 0 && countTop[j] > countTop[j-1]) {
                    temp = [countTop[j], topWords[j]];
                    countTop[j] = countTop[j-1];
                    topWords[j] = topWords[j-1];
                    countTop[j-1] = temp[0];
                    topWords[j-1] = temp[1];
                    j--;
                }
            }
        }
        console.log(topWords);
    }

    sketch.sessionName = function() {
        let seja = "";
        let children = xml.getChild("text").getChild("body").getChildren("div");

        for(let i = 0; i < children.length; i++) {
            if (children[i].getString("type") === "preface") {
                let heads = children[i].getChildren("head");
                seja = heads[0].getContent().toString() + ": ";
                seja += heads[1].getContent().toString();
                return seja;
            }
        }

        return "";
    }

    sketch.mySelectEvent = function() {

    }

    sketch.colorSeats = function(x) {
        if(x > 0) {
            sketch.fill("#888888");
            return x-1;
        }
        sketch.fill("#FFFFFF");
        return x;
    }
}

new p5(s5);