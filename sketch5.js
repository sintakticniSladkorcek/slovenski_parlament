const s5 = ( sketch ) => {

    var xml;
    var selectMenu;
    var center;
    var zamik;

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
        sketch.text(sketch.sessionName(), 0, 0, sketch.windowWidth, 50);

        /*let seja = sketch.sessionName();
        selectMenu = sketch.createSelect();
        selectMenu.position(10, 10);
        selectMenu.option(seja);
        selectMenu.selected(seja);
        selectMenu.changed(sketch.mySelectEvent);*/

        let c = sketch.windowWidth*3/8;
        center = [c, 300];
        zamik = [10, -10, -10, 10, 10, 10, -10, -10];
    }

    sketch.draw = function() {
        let number = 80;
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