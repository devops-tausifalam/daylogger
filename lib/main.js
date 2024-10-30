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

let timestamp = new Date;
let month = timestamp.getMonth() + 1;
let monthName;

    switch(month) {
        case 1:
            monthName = "January";
            break;
            case 2:
                monthName = "February";
                break;
            case 3:
                monthName = "March";
                break;
            case 4:
                monthName = "April";
                break;
            case 5:
                monthName = "May";
                break;
            case 6:
                monthName = "June";
                break;
            case 7:
                monthName = "July";
                break;
            case 8:
                monthName = "August";
                break;
            case 9:
                monthName = "September";
                break;
            case 10:
                monthName = "October";
                break;
            case 11:
                monthName = "November";
                break;
            case 12:
                monthName = "December";
                break;
            default:
                monthName = "Invalid Month";
    }

    let day = timestamp.getDate();
    let year = timestamp.getFullYear();

    const saluteDate = ` <h1>${monthName} ${day}, <br/>${year}</h1>`;
    let embedDate = document.querySelector(".heading");
    embedDate.insertAdjacentHTML("afterbegin", saluteDate)
    console.log(`Today's date is: ${monthName} ${day}, ${year}`);

    // fab-functionality
    let fab = document.querySelector(".fab-pencil");
    fab.addEventListener("click", toggleFab) 
    
    function toggleFab() {
        let btnState = document.querySelector(".inside-fxn")
        btnState.style.display = "inline-block"


        console.log(getInsidebtnStyles)
    }