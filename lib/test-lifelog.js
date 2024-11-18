// Global access
const now = new Date();

// Upper-controls
let chatSettingsBtn = document.querySelector(".chatSettings");
let settingsMenu = document.querySelector(".left-menu");

chatSettingsBtn.addEventListener("click", function () {
    settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex";
});

// Handling user input
const userTxtInput = document.getElementById("user-input");
let submitBtn = document.getElementById("log-send");
let logTree = document.getElementById("log-tree");

// Fixed android keyboard issues
submitBtn.addEventListener("blur", (e) => {
    e.preventDefault();  // Prevent the keyboard from closing
    userTxtInput.focus();  // Keep it focused
});

// Handle message sending
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    saveData();  // Save chat data
    userTxtInput.focus();
});

// Mood functionality
let crrMood = "optimist";  // Default mood
let angryme = document.getElementById("angryme");
let happyme = document.getElementById("happyme");
let mehme = document.getElementById("sadme");

function pessimist() {
    if (angryme.classList.contains("bx-angry")) {
        angryme.classList.remove("bx-angry");
        angryme.classList.add("bxs-angry");
        if (happyme.classList.contains("bxs-happy") || mehme.classList.contains("bxs-meh")) {
            happyme.classList.remove("bxs-happy");
            happyme.classList.add("bx-happy");
            mehme.classList.remove("bxs-meh");
            mehme.classList.add("bx-meh");
        }
    }
    return (crrMood = "pessimist");
}

function optimist() {
    if (happyme.classList.contains("bx-happy")) {
        happyme.classList.remove("bx-happy");
        happyme.classList.add("bxs-happy");
        if (angryme.classList.contains("bxs-angry") || mehme.classList.contains("bxs-meh")) {
            angryme.classList.remove("bxs-angry");
            angryme.classList.add("bx-angry");
            mehme.classList.remove("bxs-meh");
            mehme.classList.add("bx-meh");
        }
    }
    return (crrMood = "optimist");
}

function sad() {
    if (mehme.classList.contains("bx-meh")) {
        mehme.classList.remove("bx-meh");
        mehme.classList.add("bxs-meh");
        if (angryme.classList.contains("bxs-angry") || happyme.classList.contains("bxs-happy")) {
            angryme.classList.remove("bxs-angry");
            angryme.classList.add("bx-angry");
            happyme.classList.remove("bxs-happy");
            happyme.classList.add("bx-happy");
        }
    }
    return (crrMood = "sad");
}

// Save Data Function
function saveData() {
    let hour = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");

    const data = {
        lifelog_timestamp: `${hour}:${minutes}`,
        lifelog: userTxtInput.value,
        mood: crrMood,
    };

    if (userTxtInput.value.trim().length !== 0) {
        let entryHTML = "";

        if (crrMood === "pessimist") {
            entryHTML = `
                <li class="red">
                    <div class="log-entry">
                        <span class="chatTxt">${data.lifelog}</span>
                        <br/>
                        <span class="chatTimeStamp">${data.lifelog_timestamp}</span>
                    </div>
                </li>
            `;
        } else if (crrMood === "optimist") {
            entryHTML = `
                <li class="blu">
                    <div class="log-entry">
                        <span class="chatTxt">${data.lifelog}</span>
                        <br/>
                        <span class="chatTimeStamp">${data.lifelog_timestamp}</span>
                    </div>
                </li>
            `;
        } else if (crrMood === "sad") {
            entryHTML = `
                <li class="yellow">
                    <div class="log-entry">
                        <span class="chatTxt">${data.lifelog}</span>
                        <br/>
                        <span class="chatTimeStamp">${data.lifelog_timestamp}</span>
                    </div>
                </li>
            `;
        }

        // Insert the new chat bubble
        logTree.insertAdjacentHTML("beforeend", entryHTML.toString());

        // Store the new data in localStorage
        storeInLocalStorage(data);
    } else {
        console.warn("Input invalid");
    }

    console.log("Adding entry number:", logTree.children.length + 1);
    userTxtInput.value = "";  // Clear input field
}

// Function to store data in localStorage
function storeInLocalStorage(data) {
    const storedData = JSON.parse(localStorage.getItem("lifelogData")) || [];

    // Add the new message to the stored data
    storedData.push(data);

    // Save the updated data back to localStorage
    localStorage.setItem("lifelogData", JSON.stringify(storedData));
}

// Function to load data from localStorage
function loadDataFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem("lifelogData")) || [];

    storedData.forEach((entry) => {
        let entryHTML = "";

        if (entry.mood === "pessimist") {
            entryHTML = `
                <li class="red">
                    <div class="log-entry">
                        <span class="chatTxt">${entry.lifelog}</span>
                        <br/>
                        <span class="chatTimeStamp">${entry.lifelog_timestamp}</span>
                    </div>
                </li>
            `;
        } else if (entry.mood === "optimist") {
            entryHTML = `
                <li class="blu">
                    <div class="log-entry">
                        <span class="chatTxt">${entry.lifelog}</span>
                        <br/>
                        <span class="chatTimeStamp">${entry.lifelog_timestamp}</span>
                    </div>
                </li>
            `;
        } else if (entry.mood === "sad") {
            entryHTML = `
                <li class="yellow">
                    <div class="log-entry">
                        <span class="chatTxt">${entry.lifelog}</span>
                        <br/>
                        <span class="chatTimeStamp">${entry.lifelog_timestamp}</span>
                    </div>
                </li>
            `;
        }

        // Insert the existing chat bubbles
        logTree.insertAdjacentHTML("beforeend", entryHTML);
    });
}

// Clear data from localStorage
function clearLocalStorageData() {
    localStorage.removeItem("lifelogData");
    logTree.innerHTML = "";  // Clear displayed logs
    console.log("All data cleared from localStorage.");
}

// Dynamically create a "Clear Data" button
let clearDataButton = document.createElement("button");
clearDataButton.textContent = "Clear Data";
clearDataButton.classList.add("clear-data-btn");
clearDataButton.addEventListener("click", clearLocalStorageData);
document.body.appendChild(clearDataButton);

// Load data from localStorage when the page is loaded
document.addEventListener("DOMContentLoaded", loadDataFromLocalStorage);