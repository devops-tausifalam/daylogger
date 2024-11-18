// GLOBAL access
const now = new Date();
let db;

// Initialize IndexedDB
const request = indexedDB.open("BoxoulLifelogDB", 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains("chats")) {
        db.createObjectStore("chats", { keyPath: "date" });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log("IndexedDB initialized");
    loadChatData();
};

request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.error);
};

// Load chat data from IndexedDB
function loadChatData() {
    const transaction = db.transaction("chats", "readonly");
    const store = transaction.objectStore("chats");
    const request = store.get(getFormattedDate());

    request.onsuccess = (event) => {
        const data = event.target.result;
        if (data) {
            data.chatEntries.forEach((entry) => appendChatBubble(entry));
        }
    };

    request.onerror = () => {
        console.error("Failed to load data from IndexedDB");
    };
}

// Save chat data to IndexedDB
function saveChatData(data) {
    const transaction = db.transaction("chats", "readwrite");
    const store = transaction.objectStore("chats");

    const request = store.get(data.date);

    request.onsuccess = (event) => {
        const existingData = event.target.result || { date: data.date, chatEntries: [] };
        existingData.chatEntries.push(data.chatEntries[0]);

        const updateRequest = store.put(existingData);
        updateRequest.onsuccess = () => console.log("Chat saved successfully");
        updateRequest.onerror = () => console.error("Failed to save chat");
    };

    request.onerror = () => {
        console.error("Error fetching data from IndexedDB");
    };
}

// Helper: Get current date in YYYY-MM-DD format
function getFormattedDate() {
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// Helper: Get current time in HH:MM format
function getFormattedTime() {
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

// Append chat bubble to the DOM
function appendChatBubble(entry) {
    const entryHTML = `
        <li class="${entry.mood}">
            <div class="log-entry">
                <span class="chatTxt">${entry.content}</span>
                <br/>
                <span class="chatTimeStamp">${entry.timestamp}</span>
            </div>
        </li>
    `;
    logTree.insertAdjacentHTML("beforeend", entryHTML);
}

// Save chat bubble on user input
function saveData() {
    const userText = userTxtInput.value.trim();
    if (userText.length === 0) {
        console.warn("Input invalid");
        return;
    }

    const chatEntry = {
        id: `mssg${Date.now()}`,
        sender: "user",
        timestamp: getFormattedTime(),
        type: "text",
        content: userText,
        mood: crrMood
    };

    const chatData = {
        date: getFormattedDate(),
        chatEntries: [chatEntry]
    };

    appendChatBubble(chatEntry);
    saveChatData(chatData);

    userTxtInput.value = "";
}

// Handle moods
function updateMood(newMood) {
    crrMood = newMood;

    const moodIcons = {
        pessimist: ["bxs-angry", "bx-angry"],
        optimist: ["bxs-happy", "bx-happy"],
        sad: ["bxs-meh", "bx-meh"]
    };

    Object.entries(moodIcons).forEach(([mood, classes]) => {
        const element = document.getElementById(`${mood}me`);
        if (mood === newMood) {
            element.classList.remove(classes[1]);
            element.classList.add(classes[0]);
        } else {
            element.classList.remove(classes[0]);
            element.classList.add(classes[1]);
        }
    });
}

// Event listeners for moods
document.getElementById("angryme").addEventListener("click", () => updateMood("pessimist"));
document.getElementById("happyme").addEventListener("click", () => updateMood("optimist"));
document.getElementById("sadme").addEventListener("click", () => updateMood("sad"));

// Clear all chat data
function clearChatData() {
    const transaction = db.transaction("chats", "readwrite");
    const store = transaction.objectStore("chats");
    const request = store.clear();

    request.onsuccess = () => {
        console.log("All chat data cleared");
        logTree.innerHTML = "";
    };

    request.onerror = () => {
        console.error("Failed to clear chat data");
    };
}

// Dynamically create a button to clear data
const clearDataBtn = document.createElement("button");
clearDataBtn.textContent = "Clear Data";
clearDataBtn.className = "clear-data-btn";
clearDataBtn.addEventListener("click", clearChatData);
document.body.appendChild(clearDataBtn);

// Handle Enter key as send
userTxtInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        saveData();
    }
});

// Back to Home
function BackToHome() {
    location.href = "../../index.html"; // Adjust path if necessary
}

document.getElementById("back-home-btn").addEventListener("click", BackToHome);

// DOM references
const userTxtInput = document.getElementById("user-input");
const logTree = document.getElementById("log-tree");
let crrMood = "optimist"; // Default mood