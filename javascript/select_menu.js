const s12 = ( sketch ) => {

    var xml;
    var table;
    var sessions;
    var width;
    var selectMenu;
    var selectedSession;

    sketch.preload = function() {
        xml = sketch.loadXML("data/seja.xml");
        table = sketch.loadTable("parsed_data/events/votings.csv");
        sessions = table.getColumn(0);
    }

    sketch.setup = function() {
        width = sketch.windowWidth;
        if(width > 1000) width = width/2;

        //sketch.align(sketch.CENTER, sketch.CENTER);

        selectMenu = sketch.createSelect();
        selectMenu.parent("select_menu");
        let vseSeje = "Vse seje";
        selectMenu.option(vseSeje);
        selectMenu.selected(vseSeje);
        setCurrentSession(vseSeje);
        for (let i = 0; i < table.getRowCount(); i++) {
            let seja = sessionNameFormating(table.getString(i, 0));
            selectMenu.option(seja);
            //console.log(seja);
        }
        selectMenu.changed(sketch.mySelectEvent);

        //let canvas = sketch.createCanvas(width, 120);
        //canvas.parent("select_menu");

        sketch.drawText();
    }

    sketch.drawText = function() {
        width = sketch.windowWidth;
        if(width > 1000) width = width/2;

        selectMenu.position(0, 0, "relative");
        //selectMenu.center('vertical');
        let canvas = sketch.createCanvas(width, 150);
        canvas.parent("timeline_description");
        //canvas = sketch.createCanvas(width, 120);
        canvas.position(0, 0, "relative");
        //canvas.center('vertical');

        sketch.textFont("Courier");
        sketch.textStyle(sketch.BOLD);
        sketch.textSize(24);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text("^ Izberi sejo ^", 0, 0, width-10, 25);
        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(14);
        sketch.text("Spodaj si lahko ogledaš, kako je potekala posamezna seja. Sejo lahko izbereš v spustnem seznamu. Na vrhu boš videl, kdo je govoril, na desni strani pa lahko spremljaš, kako so se spreminjale ključne besede seje z njenim potekom. Najvišje je beseda, ki se je pojavila največkrat, sledi ji drugouvrščena in tako dalje. Tudi vsi podatki nižje se bodo nanašali na to sejo.",
            0, 30, width-10, 90);
    }

    sketch.mySelectEvent = function() {
        let selection = selectMenu.value();
        let selectedSession = "Vse seje";
        let index = 608;
        for(let i = 0; i < table.getRowCount(); i++) {
            if(selection === sessionNameFormating(table.getString(i, 0))) {
                selectedSession = table.getString(i, 0);
                index = i;
                break;
            }
        }
        setCurrentSession(selectedSession);
        setCurrentSessionId(index);
        //refreshTimeline(seja);
        //refreshLongestSentence(seja);
        //refreshAgesOfSpeakers(seja);
    }

    sketch.windowResized = function() {
        sketch.drawText();
    }

}

new p5(s12);

