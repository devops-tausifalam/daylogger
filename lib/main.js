// theme switch button & its function
let themeSwitch = document.getElementById("theme-switch-btn");
themeSwitch.addEventListener("click", switchTheme);
let currentThemeIndex = 0;
function switchTheme(){
    let appTheme = document.getElementById("appTheme");
    const JSONtheme = {
        winter: "lib/theme/winter.css"
    }
    //get the thme keys and their values 
    const themes = Object.values(JSONtheme);

    //switch to the next theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length; //cycle through themes
    appTheme.href = themes[currentThemeIndex]; //set the href to the new theme
}

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
    logTree.insertAdjacentHTML("beforeend", entryHTML);
    } else {
        console.warn("input invalid")
    }
    console.log('Adding entry number:', logTree.children.length + 1);
    userTxtInput.value = "";
}