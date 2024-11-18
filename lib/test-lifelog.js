// GLOBAL variables
const now = new Date();
let lifelogData = {}; // JSON structure to store chat data grouped by date

// DOM references
const chatSettingsBtn = document.querySelector(".chatSettings");
const settingsMenu = document.querySelector(".left-menu");
const userTxtInput = document.getElementById("user-input");
const submitBtn = document.getElementById("log-send");
const logTree = document.getElementById("log-tree");
const EnterIsSend = document.getElementById("enterIsSend");
const angryme = document.getElementById("angryme");
const happyme = document.getElementById("happyme");
const mehme = document.getElementById("sadme");

let crrMood = "optimist"; // Default mood

// Initialize lifelogData for the current date
const todayDate = now.toISOString().split("T")[0]; // e.g., 2024-11-18
if (!lifelogData[todayDate]) {
    lifelogData[todayDate] = [];
}

// Toggle settings menu
chatSettingsBtn.addEventListener("click", function () {
    settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex";
});

// Handle submit button focus
submitBtn.addEventListener('blur', (e) => {
    e.preventDefault(); // Prevent the keyboard from closing
    userTxtInput.focus(); // Keep it focused
});

// Submit button event
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    saveData();
    userTxtInput.focus();
});

// Handle mood icons
const moodIcons = document.querySelectorAll(".moodicons");
moodIcons.forEach((moodIcon) => {
    moodIcon.addEventListener("click", () => {
        if (userTxtInput.focus()) {
            userTxtInput.focus(); // Keep focus on the input
        }
    });
});

// Mood toggle functions
function pessimist() {
    if (angryme.classList.contains("bx-angry")) {
        angryme.classList.replace("bx-angry", "bxs-angry");
        happyme.classList.replace("bxs-happy", "bx-happy");
        mehme.classList.replace("bxs-meh", "bx-meh");
    }
    crrMood = "pessimist";
}
function optimist() {
    if (happyme.classList.contains("bx-happy")) {
        happyme.classList.replace("bx-happy", "bxs-happy");
        angryme.classList.replace("bxs-angry", "bx-angry");
        mehme.classList.replace("bxs-meh", "bx-meh");
    }
    crrMood = "optimist";
}
function sad() {
    if (mehme.classList.contains("bx-meh")) {
        mehme.classList.replace("bx-meh", "bxs-meh");
        angryme.classList.replace("bxs-angry", "bx-angry");
        happyme.classList.replace("bxs-happy", "bx-happy");
    }
    crrMood = "sad";
}

// Save data
function saveData() {
    const hour = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const data = {
        id: `mssg${Date.now()}`, // Unique ID for each message
        sender: "user", // Modify this as needed
        timestamp: now.toISOString(),
        type: "text",
        content: userTxtInput.value.trim(),
        mood: crrMood
    };

    if (data.content.length !== 0) {
        lifelogData[todayDate].push(data); // Save message in JSON
        renderChatBubble(data); // Render the message
        console.log("Data saved:", lifelogData);
    } else {
        console.warn("Invalid input: empty message");
    }

    userTxtInput.value = ""; // Clear input field
    console.log("Total messages for today:", lifelogData[todayDate].length);
}

// Render chat bubble
function renderChatBubble(data) {
    const moodClass = {
        pessimist: "red",
        optimist: "blu",
        sad: "yellow"
    }[data.mood];

    const entryHTML = `
        <li class="${moodClass}">
            <div class="log-entry">
                <span class="chatTxt">${data.content}</span>
                <br/>
                <span class="chatTimeStamp">${data.timestamp.split("T")[1].split(".")[0]}</span>
            </div>
        </li>
    `;
    logTree.insertAdjacentHTML("beforeend", entryHTML);
}

// Handle "Enter to Send"
function handleInputEvents(e) {
    if (e.type === "keydown" && e.key === "Enter") {
        if (EnterIsSend.checked || e.shiftKey) {
            e.preventDefault();
            saveData();
        }
    }
}
userTxtInput.addEventListener("keydown", handleInputEvents);

// Remove all logs
function removeLogs() {
    logTree.innerHTML = "";
    lifelogData[todayDate] = [];
    console.log("All logs cleared for today.");
}

// Back to home function
function BackToHome() {
    location.href = "../../index.html";
}