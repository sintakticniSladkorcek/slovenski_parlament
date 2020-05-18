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

    if(who === "ZbObc") who = "Zbora občin";
    else if(who === "DruzPolZb") who = "Družbeno političnega zbora";
    else if(who === "ZbZdruDel") who = "Zbora združenega dela";
    else if(who === "VsiZbor") who = "Vseh zborov Skupščine";

    console.log(number + ". " + what + " " + who + "-" + part+".del, " + day + "." + month + "." + year);
    return (number + ". " + what + " " + who + " - " + part+".del, " + day + "." + month + "." + year);
}