const s5 = ( sketch ) => {

    var xml;
    var selectMenu;
    var center;
    var zamik;
    var topWords;
    var position;
    var speaker;
    var width;
    var table;
    var sessions;

    sketch.preload = function() {
        xml = sketch.loadXML("data/seja.xml");
        table = sketch.loadTable("parsed_data/events/votings.csv");
        sessions = table.getColumn(0);
    }

    sketch.setup = function() {
        width = sketch.windowWidth;
        if(width > 1000) width /= 2;
        let canvas = sketch.createCanvas(width, 550);
        canvas.parent("session_timeline");

        sketch.fill("#000000");
        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Časovnica seje", 0, 0, width-30, 50);

        selectMenu = sketch.createSelect();
        selectMenu.parent("select_menu");
        selectMenu.position(10, 10, "relative");
        let vseSeje = "Vse seje";
        selectMenu.option(vseSeje);
        selectMenu.selected(vseSeje);
        //console.log(table);
        for(let i = 0; i < sessions.length; i++) {
            let seja = sessionNameFormating(sessions[i]);
            selectMenu.option(seja);
            //console.log(seja);
        }
        selectMenu.changed(sketch.mySelectEvent);

        let c = width*3/8;
        center = [c, 300];
        zamik = [10, -10, -10, 10, 10, 10, -10, -10];

        sketch.drawSeats(80);

        sketch.fill(0);
        sketch.line(30, 530, width*3/4-30, 530);
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
        sketch.rect(0, 500,width*3/4, 50);
        sketch.fill(0);
        sketch.stroke(0);
        sketch.line(30, 530, width*3/4-30, 530);
        if(sketch.mouseX > 30 && sketch.mouseX <width*3/4-30) {
            sketch.ellipse(sketch.mouseX, 530, 10, 10);
            position = (sketch.mouseX-30)/(width*3/4-60);
        }
        else if (sketch.mouseX < 30){
            sketch.ellipse(30, 530, 10, 10);
            position = 0;
        }
        else {
            sketch.ellipse(width*3/4-30, 530, 10, 10);
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
        sketch.rect(width*3/4, 50,width/4, 500);
        sketch.rect(0, 40, width*3/4, 80);
        sketch.fill(0);
        sketch.stroke(0);
        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        for(let i = 0; i < 10; i++) {
            sketch.text(topWords[i], width*3/4, i*30+150, width/4, 20);
        }
        sketch.text(speaker.substring(0, speaker.length-1), 0, 30, width*3/4, 80);
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
                var sp = children[i];
                speaker = sp.getChildren()[0].getContent();
                var utterance = sp.getChildren("u");

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
        sketch.noStroke();
        if(x > 0) {
            sketch.fill("#888888");
            return x-1;
        }
        sketch.stroke("#888888");
        sketch.fill("#FFFFFF");
        return x;
    }

    sketch.windowResized = function() {

    }
}

new p5(s5);