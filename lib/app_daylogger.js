function logSave() {
    var logDate = new Date;
    var JSONdate = {
        date: logDate.getDate(), //Get day as a number (1-31)
        day: logDate.getDay(), //Get weekday number (0-6)
        year: logDate.getFullYear(), //Get year as a four digit number (yyyy)
        month: logDate.getMonth() + 1, //getmonth
        hour: logDate.getHours(), //get hour
        minutes: logDate.getMinutes(), //get seconds
        seconds: logDate.getSeconds() //get seconds
    }
    console.log(JSONdate)
    // fetchDateTime paragraph component
    var fetch_embed = document.getElementById("fetch-dateTime");
    var fulltimeStamp = "-" + JSONdate.date + "/" + JSONdate.month + "/" + JSONdate.year + ", " + JSONdate.hour + ":" + JSONdate.minutes + ":" + JSONdate.seconds;
    //inset the text
    fetch_embed.innerText = fulltimeStamp;

    //getting inputs 
    var embed_text = document.getElementById("log-iField").value;
    console.log(embed_text)

    //DOM for actual embed text 
    var embed_here = document.getElementById("log-data");
    embed_here.innerText = embed_text;

    //JSON for compiled data 
    var JSON_log = {
        stamp: fulltimeStamp,
        message: embed_text
    }
    console.log(JSON_log)
}