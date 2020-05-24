const s15 = ( sketch ) => {

    var sessions = 608; // number of sessions
    var duration; // duration of all sessions together
    var speeches; // number of speeches
    var speakers; // number of different speakers
    var words = 46785184; // number of said words
    var applauses; // number of applauses
    var votings; // number of votings
    var presidents = 13; // number of different presidents
    var longestSentence; // the longest sentence of them all

    var duration_table;
    var speeches_table;
    var table_for_getting_session_names;
    var applauses_table;
    var votings_table;
    var sentence_table;

    var days;
    var hours;
    var minutes;

    sketch.preload = function() {
        duration_table = sketch.loadTable("parsed_data/session_duration/session_duration.csv");
        speeches_table = sketch.loadTable("parsed_data/speakers/number_of_speeches_per_speaker.csv"); // also used for getting number of all speakers
        table_for_getting_session_names = sketch.loadTable("parsed_data/events/applauses.csv"); // will be needed for speeches
        applauses_table = sketch.loadTable("parsed_data/events/applauses.csv");
        votings_table = sketch.loadTable("parsed_data/events/votings.csv");
        sentence_table = sketch.loadTable("parsed_data/sentences/longest_sentences.csv");
    }

    sketch.setup = function() {
        // duration
        duration = sketch.sumTogether(duration_table, 1, 60); // in minutes
        days = Math.floor(duration / (24 * 60));
        let remainder = duration - (days * 24 * 60);
        hours = Math.floor(remainder / 60);
        minutes = remainder - (hours * 60);

        // speeches
        speeches = sketch.sumTogether(speeches_table, 1, 0);

        // speakers
        speakers = speeches_table.getRowCount();

        // applauses
        applauses = sketch.sumTogether(applauses_table, 1, 0);

        // votings
        votings = sketch.sumTogether(votings_table, 1, 0);

        // sentences
        longestSentence = sketch.findMax(sentence_table, 1);

        sketch.createCanvasAndTitle();
    }

    sketch.sumTogether = function(table, column, divisor) {
        counter = 0;
        for(let i = 0; i < table.getRowCount(); i++) {
            data = parseInt(table.get(i, column));
            if(divisor > 0){
                data = data / divisor;
            }
            counter += data;
        }
        return counter;
    }

    sketch.findMax = function(table, column) {
        current_max = 0;
        for(let i = 0; i < table.getRowCount(); i++) {
            if(table.get(i, column) > current_max){
                current_max = table.get(i, column);
            }
        }
        return current_max;
    }

    sketch.draw = function() {}

    sketch.createCanvasAndTitle = function() {
        let my_text = "Med letoma 1990 in 1992 je parlament zasedal na ";
        my_text += sessions;
        my_text += " sejah, ki so skupaj trajale kar ";
        my_text += days;
        my_text += " dni, ";
        my_text += hours;
        my_text += " ur in ";
        my_text += minutes;
        my_text += " minut. Na vseh sejah skupaj je ";
        my_text += speakers;
        my_text += " govorcev in govork imelo ";
        my_text += speeches;
        my_text += " govora. Skupno so izrekli ";
        my_text += words;
        my_text += " besed in si prislužili ";
        my_text += applauses;
        my_text += " aplavzov. Najdaljša izrečena poved je vsebovala ";
        my_text += words;
        my_text += " besed. Skozi vse seje je bilo izvedenih ";
        my_text += votings;
        my_text += " glasovanj.";

        w = sketch.windowWidth;
        if(w > 1000) w = w/2;

        canvas = sketch.createCanvas(w, 100);
        canvas.parent("general_data");

        sketch.textFont("Courier");
        sketch.textSize(16);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text(my_text, 0, 10, w, 80);
    }

    sketch.windowResized = function() {
        sketch.createCanvasAndTitle();
    }

}

new p5(s15);
