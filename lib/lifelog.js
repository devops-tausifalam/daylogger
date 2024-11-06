// upper-controls
let chatSettingsBtn = document.querySelector(".chatSettings")
let settingsMenu = document.querySelector(".left-menu")

chatSettingsBtn.addEventListener("click", function() {
    settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex" 
})



// handling user-input 
const userTxtInput = document.getElementById("user-input");
let submitBtn = document.getElementById("log-send");
let logTree = document.getElementById("log-tree")
let emptyTxt = document.querySelector(".empty-text");

// fixed android keyboard issues
submitBtn.addEventListener('blur', (e) => {
    e.preventDefault();  // Prevent the keyboard from closing
    userTxtInput.focus();  // Keep it focused
});

submitBtn.addEventListener("click", function(event){
   
   event.preventDefault();
   saveData();
   userTxtInput.focus();

});

function saveData() {
    let getTime = new Date();
    let hour = getTime.getHours().toString();
    let minutes = getTime.getMinutes().toString().padStart(2,"0");
    const data = {
        lifelog_timestamp: `${hour}:${minutes}`,
        lifelog: userTxtInput.value
    }
    if (userTxtInput.value.trim().length !== 0) {
    const entryHTML = `
        <li>
            <div class="log-entry">
                <span class="chatTxt">${data.lifelog}</span>
                <br/>
                <span class="chatTimeStamp">${data.lifelog_timestamp}</span>
            </div>
        </li>
    `;
    logTree.insertAdjacentHTML("beforeend", entryHTML.toString());
    emptyTxt.style.display = "none";
    } else {
        console.warn("input invalid")
    }
    console.log('Adding entry number:', logTree.children.length + 1);
    userTxtInput.value = "";
}

// EnterIsSend - configuration

let EnterIsSend = document.getElementById("enterIsSend") 

//for future intended event handling 
function handleEventsForInput (e) {
    switch (e.type) {
        case "keydown": 
                e.preventDefault()
                userTxtInput.focus()
                if (e.key === "Enter"){
                    if (EnterIsSend.checked === true) {
                        e.preventDefault();
                        saveData();
                    } else {
                        if (e.shiftKey && e.key === "Enter") {
                            e.preventDefault();
                            saveData();
                        }
                        else {
                            return false;
                        }
                    }
                }
            break;
    }
}

["keydown"].forEach (e => {
    userTxtInput.addEventListener(e, handleEventsForInput);
});

// backBtn - BackToHome() 
function BackToHome() {
    location.href = "../../app_daylogger.html"
}