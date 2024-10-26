// Base function to collect and append data
function logSave() {
    // Get the current date and time
    const logDate = new Date();
    
    // Format date and time components with leading zeros for consistency
    const JSONdate = {
        date: logDate.getDate().toString().padStart(2, '0'),        // Day (1-31)
        day: logDate.getDay(),                                      // Weekday (0-6)
        year: logDate.getFullYear(),                                // Year (yyyy)
        month: (logDate.getMonth() + 1).toString().padStart(2, '0'), // Month (01-12)
        hour: logDate.getHours().toString().padStart(2, '0'),       // Hour (00-23)
        minutes: logDate.getMinutes().toString().padStart(2, '0'),  // Minutes (00-59)
        seconds: logDate.getSeconds().toString().padStart(2, '0')   // Seconds (00-59)
    };

    console.dir(JSONdate);

    // Fetch and update the timestamp in the DOM
    const fetchEmbed = document.getElementById("fetch-dateTime");
    const fullTimestamp = `${JSONdate.date}/${JSONdate.month}/${JSONdate.year}, ${JSONdate.hour}:${JSONdate.minutes}:${JSONdate.seconds}`;
    fetchEmbed.innerText = fullTimestamp;

    // Get input from user and insert it into the DOM
    const user_input = document.getElementById("user-input").value.trim();
    if (user_input) {
        const embedHere = document.getElementById("tree-text");
        embedHere.innerText = user_input;
    } else {
        console.warn("No input provided in log-iField.");
    }

    // JSON for compiled data, with fallback if input is empty
    const JSON_log = {
        stamp: fullTimestamp,
        message: user_input || "No input provided"
    };

    console.dir(JSON_log);
}
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