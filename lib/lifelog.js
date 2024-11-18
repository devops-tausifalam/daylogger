// GLOBAL access
const now = new Date();
// upper-controls
let chatSettingsBtn = document.querySelector(".chatSettings")
let settingsMenu = document.querySelector(".left-menu")

chatSettingsBtn.addEventListener("click", function() {
    settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex" 
})



// handling user-input 
const userTxtInput = document.getElementById("user-input");
let submitBtn = document.getElementById("log-send");
let logTree = document.getElementById("log-tree");

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
// moodicons 
let moody = document.querySelectorAll(".moodicons");
moody.forEach((moodIcon) => {
    moodIcon.addEventListener("click", () => {
        if (userTxtInput.focus() == true) {
            userTxtInput.focus(); //keeps focus on the input
        }
    });
});

let crrMood = "optimist";
let angryme = document.getElementById("angryme");
let happyme = document.getElementById("happyme");
function pessimist() {
    if (angryme.classList.contains("bx-angry")) {
        angryme.classList.remove("bx-angry");
        angryme.classList.add("bxs-angry");
        if (happyme.classList.contains("bxs-happy")) {
            happyme.classList.remove("bxs-happy");
            happyme.classList.add("bx-happy");
        }
    }
    return crrMood = "pessimist";
}
function optimist() {
    if (happyme.classList.contains("bx-happy")) {
        happyme.classList.remove("bx-happy");
        happyme.classList.add("bxs-happy");
        if (angryme.classList.contains("bxs-angry")) {
            angryme.classList.remove("bxs-angry");
            angryme.classList.add("bx-angry");
        }
    }
    return crrMood = "optimist";
}
function saveData() {
    let hour = now.getHours().toString().padStart(2,"0"); 
    let minutes = now.getMinutes().toString().padStart(2,"0");
    const data = {
        lifelog_timestamp: `${hour}:${minutes}`,
        lifelog: userTxtInput.value
    }
    if (userTxtInput.value.trim().length !== 0) {
        let entryHTML = "";
        if (crrMood === "pessimist") {
          entryHTML =   `
                <li class="red">
                    <div class="log-entry">
                        <span class="chatTxt">${data.lifelog}</span>
                        <br/>
                        <span class="chatTimeStamp">${data.lifelog_timestamp}</span>
                    </div>
                </li>
            `;
            logTree.insertAdjacentHTML("beforeend", entryHTML.toString());
        } else if (crrMood === "optimist") {
            entryHTML =   `
            <li class="blu">
                <div class="log-entry">
                    <span class="chatTxt">${data.lifelog}</span>
                    <br/>
                    <span class="chatTimeStamp">${data.lifelog_timestamp}</span>
                </div>
            </li>
        `;
            logTree.insertAdjacentHTML("beforeend", entryHTML.toString());
        } else {
            console.warn("input invalid")
        }
    } else {
        console.warn("input invalid")
    }
    console.log('Adding entry number:', logTree.children.length + 1);
    userTxtInput.value = "";
    console.log(data)
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

function removeLogs() {
    logTree.innerHTML = ""
}
// function createSession() {
//     // check day status
//     console.log(now.getHours())
//     let InteractionTime = {
//         prompt: () => {
//             if (now.getHours() >= 24){
//                 () => {

//                 } 
//             }
//         },
//     }
//     let sessionHTML = `<p class="session">${InteractionTime.prompt()}</p>`;
//     console.log(sessionHTML)
// }


// backBtn - BackToHome() 
function BackToHome() {
    location.href = "../../index.html"
}