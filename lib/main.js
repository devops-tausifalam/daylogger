window.onload = () => {
    // Check for API data in local storage with its expiry and perform action accordingly
    const checkUnsplash = localStorage.getItem("unsplash_db");
    const retrieve_u = JSON.parse(checkUnsplash);
    const checkQuotes = localStorage.getItem("quotes_db");
    const retrieve_q = JSON.parse(checkQuotes);

    if (checkUnsplash && checkQuotes !== null) {
        if (Date.now() > retrieve_u.exp && retrieve_q.exp) {
            // Perform API call again and delete current data
            localStorage.removeItem("unsplash_db");
            localStorage.removeItem("quotes_db");
            showProgress();
            loadUnsplash();
            loadQuote();
        } else {
            // Reload existing data
            document.querySelector(".motivationBox").style.backgroundImage = `url('${retrieve_u.image}')`;
            document.getElementById("quote").textContent = retrieve_q.quote_txt;
            document.getElementById("author").textContent = retrieve_q.quote_author;
            hideProgress();
            document.querySelector(".quoteBox").style.visibility = "visible";
        }
    } else {
        loadUnsplash();
        loadQuote();
        showProgress();
    }
};

// Get current month and year to display in heading
let timestamp = new Date();
let month = timestamp.getMonth() + 1;
let monthName;

switch (month) {
    case 1: monthName = "January"; break;
    case 2: monthName = "February"; break;
    case 3: monthName = "March"; break;
    case 4: monthName = "April"; break;
    case 5: monthName = "May"; break;
    case 6: monthName = "June"; break;
    case 7: monthName = "July"; break;
    case 8: monthName = "August"; break;
    case 9: monthName = "September"; break;
    case 10: monthName = "October"; break;
    case 11: monthName = "November"; break;
    case 12: monthName = "December"; break;
    default: monthName = "Invalid Month";
}

let day = timestamp.getDate();
let year = timestamp.getFullYear();

const saluteDate = `<h1>${monthName} ${day}, <br/>${year}</h1>`;
let embedDate = document.querySelector(".heading");
embedDate.insertAdjacentHTML("afterbegin", saluteDate);
console.log(`Today's date is: ${monthName} ${day}, ${year}`);

// FAB functionality (floating action button)
let fab = document.querySelector(".fab-pencil");
let fabIcon = document.querySelector(".fab-pencil i");
fab.addEventListener("click", toggleFab);

function toggleFab() {
    let btnStateCoffee = document.querySelector(".inside-fxn-coffee");
    let btnStateBlurt = document.querySelector(".inside-fxn-boxoul");

    // Toggle visibility based on current display state
    btnStateCoffee.style.display = (btnStateCoffee.style.display === "block") ? "none" : "block";
    btnStateBlurt.style.display = (btnStateBlurt.style.display === "block") ? "none" : "block";
    fab.classList.toggle("active");

    // Toggle icon for FAB
    if (fabIcon.classList.contains("bx-chevron-left")) {
        fabIcon.classList.remove("bx-chevron-left");
        fabIcon.classList.add("bxs-pencil");
    } else {
        fabIcon.classList.add("bx-chevron-left");
        fabIcon.classList.remove("bxs-pencil");
    }
}

// Load Unsplash image
let progress = document.querySelector(".progress-circle");
function showProgress() {
    progress.style.visibility = "visible";
}

function hideProgress() {
    progress.style.visibility = "hidden";
}

const unsplashAPI = "YOUR_API_KEY";
const imageTopics = "life,happiness,love,perseverance,resilience,purpose";
const unsplash = `https://api.unsplash.com/photos/random?&topics=${imageTopics}&query=black,dark,night,dawn,sunrise&orientation=landscape&count=1&client_id=${unsplashAPI}`;
const motivationBG = document.querySelector(".motivationBox");

// API request limits
const epochSeconds = Date.now();
const expiry = epochSeconds + 4 * 60 * 60 * 1000; // 4 hours expiry

async function loadUnsplash() {
    try {
        const unsplash_resp = await fetch(unsplash);
        if (!unsplash_resp.ok) {
            throw new Error(`HTTP error while loading Unsplash status: ${unsplash_resp.status}`);
        } else {
            const unsplash_data = await unsplash_resp.json();
            let imageURL = unsplash_data[0].urls.full;
            motivationBG.style.backgroundImage = `url('${imageURL}')`;
            checkCompletion();

            // Save image data in local storage with expiration time
            const saveUnsplash = {
                image: imageURL,
                exp: expiry
            };
            localStorage.setItem("unsplash_db", JSON.stringify(saveUnsplash));
        }
    } catch (error) {
        console.error("Error fetching the image:", error);
    }
}

// Load motivational quote
const quote_api = `https://quoteslate.vercel.app/api/quotes/random?maxLength=200&tags=perseverance&count=1`;
let quoteBlock = document.getElementById("quote");
let quoteAuthor = document.getElementById("author");

async function loadQuote() {
    try {
        const quote_resp = await fetch(quote_api);
        if (!quote_resp.ok) {
            throw new Error(`HTTP error while loading quote status: ${quote_resp.status}`);
        } else {
            const quote_data = await quote_resp.json();
            quoteBlock.textContent = quote_data.quote;
            quoteAuthor.textContent = `- ${quote_data.author}`;
            checkCompletion();

            // Save quote data in local storage with expiration time
            const saveQuote = {
                quote_txt: quote_data.quote,
                quote_author: `- ${quote_data.author}`,
                exp: expiry
            };
            localStorage.setItem("quotes_db", JSON.stringify(saveQuote));
        }
    } catch (error) {
        console.error("Error fetching quote:", error);
    }
}

// Check if both image and quote are loaded, and hide progress
let loadCounter = 0;
let motivationBox = document.querySelector(".motivationBox");
let errorMssg = document.createElement("p");
errorMssg.classList.add("errorMssg");
errorMssg.style.color = "var(--emotionRed)";
errorMssg.style.fontSize = "1.5em";
motivationBox.prepend(errorMssg);

function checkCompletion() {
    loadCounter += 1;
    if (loadCounter === 2) {
        hideProgress();
        document.querySelector(".quoteBox").style.visibility = "visible";
        errorMssg.style.display = "none";
    } else {
        hideProgress();
        errorMssg.style.display = "block";
    }
}
