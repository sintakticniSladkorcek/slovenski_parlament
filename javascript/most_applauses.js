const s4 = ( sketch ) => {

    var xml;
    var countApplauses;
    var canvas;
    var mouse;
    var shown;
    var img;
    var seja;

    sketch.preload = function() {
        xml = sketch.loadXML("data/seja.xml");
        img = sketch.loadImage("applause.jpg");
    }

    sketch.setup = function() {
        /*imgW = sketch.windowWidth/20;
        imgH = imgW;

        canvas = sketch.createCanvas(sketch.windowWidth, imgH+30);
        canvas.parent('most_applauses');*/

        countApplauses = 0;
        seja = "";
        let children = xml.getChild("text").getChild("body").getChildren("div");

        for(let i = 0; i < children.length; i++) {
            if(children[i].getString("type") === "preface") {
                let heads = children[i].getChildren("head");
                seja = heads[0].getContent().toString() + ": ";
                seja += heads[1].getContent().toString();
            }
            let incidents = children[i].getChildren("incident");

            for(let j = 0; j < incidents.length; j++) {
                if((incidents[j].getContent()).includes("Aplavz")) {
                    countApplauses++;
                }
            }
        }


        /*sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Največ aplavzov na seji", 0, 0, sketch.windowWidth, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.text(seja, 0, 30, sketch.windowWidth, 20);*/

        sketch.createCanvasAndTitle();
        mouse = 0;
        shown = 0;
    }

    sketch.draw = function() {
        sketch.frameRate(5);
        for(let i = 0; i < countApplauses; i++) {
            if (i*imgH < sketch.mouseY) {
                mouse = (i+1)*10;
            }
        }
        if (shown < Math.min(mouse, countApplauses)) {
            sketch.image(img, sketch.windowWidth/4+imgW*(shown%10), 50+imgH*Math.floor(shown/10), imgW, imgH);
            shown++;
        }
    }

    sketch.drawHands = function() {
        if(shown === countApplauses) {
            for(let i = 0; i < countApplauses; i++) {
                sketch.image(img, sketch.windowWidth/4+imgW*(i%10), 50+imgH*Math.floor(i/10), imgW, imgH);
            }
        }
    }

    sketch.createCanvasAndTitle = function() {
        imgW = sketch.windowWidth/20;
        imgH = imgW;

        canvas = sketch.createCanvas(sketch.windowWidth, 50+imgH*Math.ceil(countApplauses/10));
        canvas.parent('most_applauses');

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("Največ aplavzov na seji", 0, 0, sketch.windowWidth, 30);

        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(16);
        sketch.text(seja, 0, 30, sketch.windowWidth, 20);
    }

    sketch.windowResized = function() {
        sketch.createCanvasAndTitle();
        sketch.drawHands();
    }

}

new p5(s4);
