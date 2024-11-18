window.onload = () => {
    // check for api data in localstorage with its expiry and perform action accordingly
    let checkUnsplash = localStorage.getItem("unsplash_db")
    const retrieve_u = JSON.parse(checkUnsplash)
    let checkQuotes = localStorage.getItem("quotes_db")
    const retrieve_q = JSON.parse(checkQuotes)

if (checkUnsplash && checkQuotes !== null){
    if (Date.now() > retrieve_u.exp && retrieve_q.exp) {
        // perform api call again & delete current data
        localStorage.removeItem("unsplash_db")
        localStorage.removeItem("quotes_db")
				 showProgress();
        loadunsplash();
        loadQuote();
    } else {
        // reload existing data 
        document.querySelector(".motivationBox").style.backgroundImage = `url('${retrieve_u.image}')`;
        document.getElementById("quote").textContent = retrieve_q.quote_txt;
        document.getElementById("author").textContent = retrieve_q.quote_author;
        hideProgress();
        document.querySelector(".quoteBox").style.visibility = "visible";
    }
} else {
    loadunsplash();
    loadQuote();
    showProgress();
}
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
    let fabIcon = document.querySelector(".fab-pencil i");
    fab.addEventListener("click", toggleFab) 
    
    function toggleFab() {
        
        let btnStateCoffee = document.querySelector(".inside-fxn-coffee");
        let btnStateBlurt = document.querySelector(".inside-fxn-boxoul");

        // conditional operator used here => condition ? valueIfTrue : valueIfFalse;

        // Toggle visibility based on current display state
        btnStateCoffee.style.display = btnStateCoffee.style.display === "block" ? "none" : "block";
        btnStateBlurt.style.display = btnStateBlurt.style.display === "block" ? "none" : "block";
        fab.classList.toggle("active")
        if (fabIcon.classList.contains("bx-chevron-left")) {
            fabIcon.classList.remove("bx-chevron-left")
            fabIcon.classList.add("bxs-pencil")
        } else {
            fabIcon.classList.add("bx-chevron-left")
            fabIcon.classList.remove("bxs-pencil")
        }
    }

// load-unsplash 
let progress = document.querySelector(".progress-circle");
function showProgress() {
    progress.style.visibility = "visible";
}
function hideProgress() {
    progress.style.visibility = "hidden";
}

const unsplashAPI = "rUISXHol-YVaOmNgwGaPMEbnifKRi_Bjm8U9oBI1Hik";
const imageTopics = "life,happiness,love,perseverance,resilience,purpose";
const unsplash = `https://api.unsplash.com/photos/random?&topics=${imageTopics}&query=black,dark,night,dawn,sunrise&orientation=landscape&count=1&client_id=${unsplashAPI}`;
const motivationBG = document.querySelector(".motivationBox");
// api request limits
const epochSeconds = Date.now();
const expiry = epochSeconds + 4*60*60*1000 //4 hours expiry

async function loadunsplash() {
    try {

        const unsplash_resp = await fetch(unsplash)
        if (!unsplash_resp.ok) {
            throw new Error(`HTTP error! while loading unsplash status: ${unsplash_resp.status}`)
        } else {
            const unsplash_data = await unsplash_resp.json();
            let imageURL = unsplash_data[0].urls.full;
            motivationBG.style.backgroundImage = `url('${imageURL}')`;
            checkCompletion();

            // limiting api requests to 4 hours to tackle api limits 
            const saveUnsplash = {
                image: imageURL,
                exp: expiry
            }
            localStorage.setItem("unsplash_db", JSON.stringify(saveUnsplash))
        }
    } catch (error) {
        console.error("Error fetching the Image: ", error)
    }
}
// load motivational qoute 
const quote_api = `https://quoteslate.vercel.app/api/quotes/random?maxLength=200&tags=perseverance&count=1`;
let quoteBlock = document.getElementById("quote");
let quoteAuthor = document.getElementById("author");
async function loadQuote() {
    try {
        const quote_resp = await fetch(quote_api);
        if (!quote_resp.ok){
            throw new Error(`HTTP error while loading quote status: ${quote_resp.status}`);
        } else {
            const quote_data = await quote_resp.json();
            quoteBlock.textContent = quote_data.quote;
            quoteAuthor.textContent = "- " + quote_data.author;
            checkCompletion();

            // limiting api requests to 4 hours to tackle api limits 
            const saveUnsplash = {
                quote_txt: quote_data.quote,
                quote_author: "- " + quote_data.author,
                exp: expiry
            }
            localStorage.setItem("quotes_db", JSON.stringify(saveUnsplash))
        }
    } catch (error) {
        console.error("Error fetching quote: ", error)
    }
}

// Check if both image and quote are loaded, and hide progress
let loadCounter = 0;
let motivationBox = document.querySelector(".motivationBox");
let errorMssg = document.createElement("p");
errorMssg.classList.add("errorMssg")
errorMssg.style.color = "var(--emotionRed)";
errorMssg.style.fontSize = "1.5em";
motivationBox.prepend(errorMssg);

function checkCompletion() {
    loadCounter += 1;
    if (loadCounter === 2) {
        hideProgress();
        // loadQuote block
        document.querySelector(".quoteBox").style.visibility = "visible";
        errorMssg.style.display = "none";
    } else {
        hideProgress();
        errorMssg.style.display = "block";
    }
}
