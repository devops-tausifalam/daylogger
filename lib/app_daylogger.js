//base-function to collect/append data
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

//upload-image-fucntion for modal 
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("log-localimage");
const imageView = document.getElementById("image-view");

inputFile.addEventListener("change", uploadImage);
function uploadImage(){
    var imgLink = URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage = `url(${imgLink})`;
    const insideElement = document.querySelectorAll("#image-view i, #image-view p");
    insideElement.forEach(function(elements){
        elements.style.opacity = "0";
    });
    document.querySelector("#image-view").style.border = "none";
}
let closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", function () {
        document.getElementById("modal-base").style.display = "none";
        document.getElementById("ground-floor").style.display = "block";
})
// addEventListner for opening modal to upload images
let openModal = document.getElementById("log-upload");
openModal.addEventListener("click", function (){
    document.getElementById("modal-base").style.display = "block";
        document.getElementById("ground-floor").style.display = "none";
})