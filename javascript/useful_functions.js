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
    presidents = loadTable("parsed_data/presidents/all_presidents.csv");
}

function getSpeakers() {return ages_of_speakers}
function getPresidents() {return presidents}

// Buttons that switch between the two views for the podium
var president_speakers_mode = true; // true if PREDSEDNIKI button is selected.
var button;
var buttons = [];
function getSpeakerMode() {return president_speakers_mode}



// Button is selected, when it's class is my_btn_clicked. When not selected, the class is my_btn
function toggleSpeakerMode() {
    
    buttons_base = document.getElementsByClassName("btn-group");
    // buttons = document.childNodes[1].childNodes[0].childNodes[3].childNodes[7];
    for(var i = 0; i < buttons_base[0].childNodes.length; i++){
        button = buttons_base[0].childNodes[i];
        if(button.nodeName == "BUTTON"){
            buttons.push(button);
            button.addEventListener("click", function() {
                // if(this.className == "my_btn"){
                //     other = document.getElementsByClassName("my_btn","clicked");
                //     other.className = "my_btn";
                //     this.className = "my_btn_clicked";
                //     president_speakers_mode = !president_speakers_mode;
                //     new p5(s7);
                // }

                // NE DELA
                // var canvas = document.getElementById('canvas_speakers'),
                // ctx = canvas.getContext('2d');

                if(this.className != "my_btn clicked"){
                    var other = document.getElementsByClassName("my_btn clicked");
                    other[0].className = other[0].className.replace(" clicked", "");
                    this.className += " clicked";
                    president_speakers_mode = !president_speakers_mode;
                    // new p5(s7); // TODO: change to write to the same canvas
                    ctx.restore();
                }
                            
                // var ajda = current.className;
                // // If there's no active class
                // if (current.className == "my_btn") {
                //     current[0].className = current[0].className.replace("my_btn", "my_btn_clicked");
                // } else {
                //     current[0].className = current[0].className.replace("my_btn_clicked", "my_btn");
                // }
            
                // // Add the active class to the current/clicked button
                
            });
        } 
    }
}


