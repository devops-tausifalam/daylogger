// handling user-input 
const userTxtInput = document.getElementById("user-input");
let submitBtn = document.getElementById("log-send");
let logTree = document.getElementById("log-tree")

submitBtn.addEventListener("click", saveData);

function saveData() {
    let getTime = new Date();
    const data = {
        blurt_timestamp: getTime.toLocaleString(),
        blurt: userTxtInput.value
    }
    if (userTxtInput.value.length !== 0 && userTxtInput.value !== " ") {
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
    } else {
        console.warn("input invalid")
    }
    console.log('Adding entry number:', logTree.children.length + 1);
    userTxtInput.value = "";
}

function handleEventsForInput (e) {
    switch (e.type) {
        case "keydown": 
                if (e.key === "Enter"){
                    userTxtInput.style.height = 30 + "px";
                    e.preventDefault();
                    saveData();
                }
                else if (e.key === "Backspace"){
                        userTxtInput.style.height = "auto";
                    if (userTxtInput.value.length === 0) {
                        userTxtInput.style.height = 30 + "px";
                    } else {
                        userTxtInput.style.height = Math.max(userTxtInput.scrollHeight, 50) + "px";
                    }
                }
            break;
        case "input":
                if (userTxtInput.scrollHeight > userTxtInput.clientHeight) {
                    userTxtInput.style.height = "auto";
                    userTxtInput.style.height = Math.min(userTxtInput.scrollHeight, 200) + "px";
                }
            break;
    }
}

["keydown", "input"].forEach (e => {
    userTxtInput.addEventListener(e, handleEventsForInput);
});