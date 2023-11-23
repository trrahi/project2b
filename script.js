// RANDOM TESTAILUA, EI LIITY MUUHUN APPIIN STARTS
// Random promise testailua
let kanyeIsCrazy = true
const kanyePromise = new Promise((resolve, reject) => {
    if (kanyeIsCrazy) {
        const result = "Kanye is indeed crazy mf"
        resolve(result)
    } else {
        const reason = "He took his medicine"
        reject(reason)
    }
})
kanyePromise
    .then(kanyeState => {
        console.log(kanyeState)
        // Outputs "Kanye is indeed crazy mf"
    })
    .catch(kanyeFail => {
        console.log(kanyeFail);
        // Outputs "He took his medicine"
    })


// Random olio testailua

// Luo konstruktori
function kanyesCar(make, model, year, doesHeLikeIt) {
    this.make = make
    this.model = model
    this.year = year
    this.doesHeLikeIt = doesHeLikeIt
}
// Luo uusi instanssi
const toyota = new kanyesCar("Toyota", "Prius", 2023, true)
console.log(toyota);
// Destruktori
const { make, model} = toyota
console.log(make);
// RANDOM TESTAILUA, EI LIITY MUUHUN APPIIN ENDS





// APP STARTS APP STARTS APP STARTS APP STARTS APP STARTS APP STARTS APP STARTS APP STARTS APP STARTS APP STARTS APP STARTS 

// API KEY FOR KANYE WEST GREATESS
const kanyeAPI = "https://api.kanye.rest/"

// REFERENCES TO HTML ELEMENTS STARTS
const pageTitleContainer = $(".page-title-container")
const siteName = $(".site.name")
const contentContainer = $(".content-container")
const contentContainer2 = document.querySelector(".content-container")
const getQuoteButton = $(".get-quote")
const kanyesQuotes = $(".kanyes-quotes")
const rateQuote = $(".rate-quote")
const rating = $(".rating")
// REFERENCES TO HTML ELEMENTS ENDS


// ADDING EVENT LISTENERS STARTS
document.addEventListener("DOMContentLoaded", getQuoteFromKanye)
getQuoteButton.on("click", getQuoteFromKanye)
rateQuote.on("click", rateQuoteFunction)
// ADDING EVENT LISTENERS ENDS



// Class for kanyeQuoteObj object
class kanyeQuote {
    constructor(quoteText, rating) {
        this.quoteText = quoteText
        this.rating = rating
    }
    // This is a class and not a constructor incase i would have created methods for it, but decided to not later
}

// Define array for storing quotes and ratings
let arrayOfKanyeQuoteObjects = []



// FUNCTIONS STARTS
// Get quotes from the man Kanye himself
function getQuoteFromKanye() {
    fetch(kanyeAPI)
        .then(response => {
            if (response.ok) {
                return response.json()
                .then(responseAsJSON => {
                    kanyesQuotes.text(responseAsJSON.quote)
                })
            }
        })
        .catch(error => {
            console.log("Chekc the API url u idiot butterfinger, u typed it wrong" + error);
        })
}

// Rate quote and store quote and rating to localStorage
function rateQuoteFunction(event) {
    if (arrayOfKanyeQuoteObjects.length < 1){
        let kanyeQuoteToArray = new kanyeQuote(kanyesQuotes.text(), event.target.textContent)
        arrayOfKanyeQuoteObjects.push(kanyeQuoteToArray)
        
        if (!contentContainer2.lastElementChild.classList.contains("kanyes-thank-you")) {
            const kanyesThankYou = $('<p>').addClass('kanyes-thank-you').text("Kanye thanks you for your feedback! 🙏")
            contentContainer.append(kanyesThankYou)
            setTimeout(() => {
                $(".kanyes-thank-you").remove()
            }, 2000)
        }
        saveQuoteAndRatingToLocalStorage()
        displayAverageRatingToUser()
    }
    else if (arrayOfKanyeQuoteObjects[arrayOfKanyeQuoteObjects.length - 1].quoteText !== kanyesQuotes.text()) {
        let kanyeQuoteToArray = new kanyeQuote(kanyesQuotes.text(), event.target.textContent)
        arrayOfKanyeQuoteObjects.push(kanyeQuoteToArray)
        
        if (!contentContainer2.lastElementChild.classList.contains("kanyes-thank-you")) {
            const kanyesThankYou = $('<p>').addClass('kanyes-thank-you').text("Kanye thanks you for your feedback! 🙏")
            contentContainer.append(kanyesThankYou)
            setTimeout(() => {
                $(".kanyes-thank-you").remove()
            }, 2000)
        }
        saveQuoteAndRatingToLocalStorage()
        displayAverageRatingToUser()
    } else {
        if (contentContainer2.lastElementChild.textContent.includes("Kanye thanks you")) {
            $(".kanyes-thank-you").remove()
        } if (!contentContainer2.lastElementChild.classList.contains("kanyes-thank-you")) {
                const kanyesThankYou = $('<p>').addClass('kanyes-thank-you').text(`You can't rate a quote twice. Or as Kanye would put it: "You can’t look at a glass half full or empty if it’s overflowing."`)
                contentContainer.append(kanyesThankYou)
                setTimeout(() => {
                    $(".kanyes-thank-you").remove()
                }, 5000)
            }
    }
}




// Function for saving things in LS
function saveQuoteAndRatingToLocalStorage() {
    if (localStorage.getItem("quotesAndRatings") == null) {
        let newDataAsString = JSON.stringify(arrayOfKanyeQuoteObjects)
        localStorage.setItem("quotesAndRatings", newDataAsString)
    } else {
        localStorage.removeItem("quotesAndRatings")
        let newDataAsString = JSON.stringify(arrayOfKanyeQuoteObjects)
        localStorage.setItem("quotesAndRatings", newDataAsString)
        // console.log("orig");
        // console.log(arrayOfKanyeQuoteObjects);
        // console.log("ls");
        // console.log(JSON.parse(localStorage.getItem("quotesAndRatings")))
    } 
}


// Load things from LS to arrayOfKanyeQuoteObjects- variable
function loadLocalStorageContentToVariable() {
    let thingsFromLS = localStorage.getItem("quotesAndRatings")
    if (thingsFromLS !== null) {
        arrayOfKanyeQuoteObjects = JSON.parse(thingsFromLS)
        console.log(arrayOfKanyeQuoteObjects)
        console.log(JSON.parse(localStorage.getItem("quotesAndRatings")));

        const average = calculateAverageOfRatings(arrayOfKanyeQuoteObjects)
    }
}
loadLocalStorageContentToVariable()



// Calculate average rating of array
function calculateAverageOfRatings(array) {
    let allRatingsSum = 0
    for (let item of array) {
        allRatingsSum += Number(item.rating)
    }
    const averageBeforeFix = allRatingsSum / arrayOfKanyeQuoteObjects.length
    const average = averageBeforeFix.toFixed(1)
    return average
}


// Display rating to user
function displayAverageRatingToUser() {
    if (arrayOfKanyeQuoteObjects.length < 1) {
        rating.text("")
    } else {
        const averageRating = calculateAverageOfRatings(arrayOfKanyeQuoteObjects)
        rating.text(`Average rating is: ${averageRating}`)
    }

}
displayAverageRatingToUser()

// FUNCTIONS ENDS

































// TESTING AREA STARTS
function eventFired() {
    console.log("event fired successfully");
}
