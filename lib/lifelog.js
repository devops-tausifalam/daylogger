window.onload = () => {
  loadLogs(); // Load and display saved logs
  // Other initializations as needed...
};
// upper-controls
let chatSettingsBtn = document.querySelector(".chatSettings");
let settingsMenu = document.querySelector(".left-menu");

chatSettingsBtn.addEventListener("click", function () {
  const toggleCondition = settingsMenu.style.transform === "scale(1)" ? "scale(0)" : "scale(1)";
  settingsMenu.style.transform = toggleCondition;
});

// handling user-input
const userTxtInput = document.getElementById("user-input");
let submitBtn = document.getElementById("log-send");
let logTree = document.getElementById("log-tree");

// fixed android keyboard issues
submitBtn.addEventListener("blur", (e) => {
  e.preventDefault(); // Prevent the keyboard from closing
  userTxtInput.focus(); // Keep it focused
});

submitBtn.addEventListener("click", function (event) {
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
let mehme = document.getElementById("sadme");
function pessimist() {
  if (angryme.classList.contains("bx-angry")) {
    angryme.classList.remove("bx-angry");
    angryme.classList.add("bxs-angry");
    if (
      happyme.classList.contains("bxs-happy") ||
      mehme.classList.contains("bxs-meh")
    ) {
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
    if (
      angryme.classList.contains("bxs-angry") ||
      mehme.classList.contains("bxs-meh")
    ) {
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
    if (
      angryme.classList.contains("bxs-angry") ||
      happyme.classList.contains("bxs-happy")
    ) {
      angryme.classList.remove("bxs-angry");
      angryme.classList.add("bx-angry");
      happyme.classList.remove("bxs-happy");
      happyme.classList.add("bx-happy");
    }
  }
  return (crrMood = "sad");
}

// Handling database for chatLogs with pouchDB
const db = new PouchDB("lifelog-db");

async function saveData() {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const data = {
    _id: now.toISOString(), //unique id for each entry
    lifelog_timestamp: `${hour}:${minutes}`,
    lifelog: userTxtInput.value,
    mood: crrMood,
  };
  if (userTxtInput.value.trim().length !== 0) {
    db.put(data)
      .then(function () {
        // declare response variable for debugging
        // After saving to PouchDB, display the log in the UI
        addLogToUI(data);
      })
      .catch(function (err) {
        console.error("error saving response", err);
      });
    userTxtInput.value = "";
  } else {
    console.warn("input invalid");
  }
  userTxtInput.value = "";
}

function addLogToUI(data) {
  let entryHTML = "";

  // Determine the color based on mood
  if (data.mood === "pessimist") {
    entryHTML = `
                <li class="red">
                    <div class="log-entry">
                        <span class="chatTxt">${data.lifelog}</span>
                        <br/>
                        <span class="chatTimeStamp">${data.lifelog_timestamp}</span>
                    </div>
                </li>
            `;
  } else if (data.mood === "optimist") {
    entryHTML = `
                <li class="blu">
                    <div class="log-entry">
                        <span class="chatTxt">${data.lifelog}</span>
                        <br/>
                        <span class="chatTimeStamp">${data.lifelog_timestamp}</span>
                    </div>
                </li>
            `;
  } else if (data.mood === "sad") {
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

  logTree.insertAdjacentHTML("beforeend", entryHTML);
}

async function loadLogs() {
  db.allDocs({ include_docs: true, descending: false })
    .then(function (result) {
      result.rows.forEach(function (row) {
        addLogToUI(row.doc); // Add each log entry to the UI
      });
    })
    .catch(function (err) {
      console.error("Error loading logs from PouchDB", err);
    });
}
// handling dissappearing messgaes 
const Diss_switch = document.getElementById("Dmssg");
const bulletin = document.getElementById("bulletin");
Diss_switch.addEventListener("change", () => {
  if (Diss_switch.checked) {
    bulletin.textContent = "Your messages will dissappear every 48 Hours.";

    const epochSeconds = Date.now();
    const expiry = epochSeconds + 48 * 60 * 60 * 1000; // 48 hours expiry
    if (epochSeconds < expiry) {
      try {
        db.destroy()
      } catch(err) {
        bulletin.textContent = err;
      }
    } 
    
  } else {
    bulletin.textContent = "Dissapparing Messages (turned-off)";
  }
})



// EnterIsSend - configuration

let EnterIsSend = document.getElementById("enterIsSend");
//for future intended event handling
function handleEventsForInput(e) {
  switch (e.type) {
    case "keydown":
      if (e.key === "Enter") {
        if (EnterIsSend.checked === true) {
          e.preventDefault();
          saveData();
        } else {
          if (e.shiftKey && e.key === "Enter") {
            e.preventDefault();
            saveData();
          } else {
            return false;
          }
        }
      }
      break;
  }
}

["keydown"].forEach((e) => {
  userTxtInput.addEventListener(e, handleEventsForInput);
});

function removeLogs() {
  logTree.innerHTML = "";
  db.destroy(); //delete data from database
}
// backBtn - BackToHome()
function BackToHome() {
  location.href = "../../index.html";
}
