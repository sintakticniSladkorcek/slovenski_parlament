function sessionNameFormating(string) {
    let len = string.length;

    let year = parseInt(string.substring(0, 4));
    let month = parseInt(string.substring(5, 7));
    let day = parseInt(string.substring(8, 10));
    let who = string.substring(11, len-8);
    let what = string.substring(len-7, len-6);
    let number = parseInt(string.substring(len-6, len-3));
    let part = parseInt(string.substring(len-2, len));

    if(what === "s") what = "Seja";
    else if(what === "z") what = "Zasedanje";
    else if(what === "d") what = "Delovna seja";
    else if(what === "l") { what = "Slavnostna seja"; who = who.substring(0, who.length-1)}

    if(who === "ZbObc") who = "Zbora občin";
    else if(who === "DruzPolZb") who = "Družbeno političnega zbora";
    else if(who === "ZbZdruDel") who = "Zbora združenega dela";
    else if(who === "VsiZbor") who = "Vseh zborov Skupščine";

    //console.log(number + ". " + what + " " + who + "-" + part+".del, " + day + "." + month + "." + year);
    return (number + ". " + what + " " + who + " - " + part+".del, " + day + "." + month + "." + year);
}

function stringToArray(string) {
    let strings = string.split('\'');
    let array = [];
    for(let i = 0; i < strings.length; i++) {
        if(!strings[i].includes("\[") && !strings[i].includes("\]") && !strings[i].includes("\,")) {
            //console.log(strings[i]);
            array.push(strings[i]);
        }
    }
    return array;
}

var currentSession = "Vse seje";
var currentSessionId = 608;
function setCurrentSession(session) {currentSession = session}
function getCurrentSession() {return currentSession}
function setCurrentSessionId(id) {currentSessionId = id}
function getCurrentSessionId() {return currentSessionId}


var ages_of_speakers;
var presidents;

function preload() {
    ages_of_speakers = loadTable("parsed_data/speakers/ages_of_speakers.csv");
    presidents = loadTable("parsed_data/presidents/presidents.csv");
}

function getSpeakers() {return ages_of_speakers}
function getPresidents() {return presidents}