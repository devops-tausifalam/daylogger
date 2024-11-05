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
submitBtn.addEventListener("click", saveData);

function saveData() {
    let getTime = new Date();
    const data = {
        blurt_timestamp: getTime.toLocaleString(),
        blurt: userTxtInput.value
    }
    if (userTxtInput.value.trim().length !== 0) {
    const entryHTML = `
        <li>
            <div class="log-entry">
              <!--  <span class="log-date">${data.blurt_timestamp}</span>
                <br/> -->
                <span class="log-text">${data.blurt}</span>
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
    userTextInput.focus();
}

// EnterIsSend - configuration

let EnterIsSend = document.getElementById("enterIsSend") 

//for future intended event handling 
function handleEventsForInput (e) {
    switch (e.type) {
        case "keydown": 
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