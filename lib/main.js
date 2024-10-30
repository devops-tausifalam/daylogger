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