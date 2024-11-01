// handling user-input 
let userTxtInput = document.getElementById("user-input");
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

userTxtInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter"){
        event.preventDefault();
        saveData();
    }
});