let lastSeasoningsHorizontal;
let consecutiveSeasoningsUpdateAttempts = 0;
let consecutiveSeasoningsUpdateAttemptsMaximum = 1;
console.log(document.URL);

function updateWindow () {
        if (lastSeasoningsHorizontal != (window.innerWidth > window.innerHeight)) {
        if (consecutiveSeasoningsUpdateAttempts == consecutiveSeasoningsUpdateAttemptsMaximum) {
            displayGenericError();
            return;
        }
        consecutiveSeasoningsUpdateAttempts++;
        try {
            // Find the tag with the stylesheets rel
            seasoningsBeholderSuspects = document.getElementsByTagName("link");
            let seasoningsBeholder;
            investigation: for (let subject of seasoningsBeholderSuspects) {
                if (subject.rel == "stylesheet") {
                    seasoningsBeholder = subject;
                    break investigation;
                }
            }
            
            // Get info about the seasonings
            seasoningsLocation = seasoningsBeholder.href;
            seasoningsLocationSplit = seasoningsLocation.search("Seasonings/") + 11;
            seasoningsName = seasoningsLocation.substring(seasoningsLocationSplit);
            seasoningsName = seasoningsName.split("/");
            seasoningsName = seasoningsName[seasoningsName.length - 1];
            seasoningsLocation = seasoningsLocation.substring(0, seasoningsLocationSplit);
                
            // Determine new seasoning to apply & follow through
            let newSeasonings = seasoningsLocation;
            if (window.innerWidth > window.innerHeight) newSeasonings += "Desktop/";
            else newSeasonings += "Mobile/";
            newSeasonings += seasoningsName
            seasoningsBeholder.href = newSeasonings;

            lastSeasoningsHorizontal = (window.innerWidth > window.innerHeight);
        } catch (error) {
            console.error("Whoopsie doodle! " + error);
        }
    } else consecutiveSeasoningsUpdateAttempts = 0;

    requestAnimationFrame(updateWindow);
}

// Create and display warning when something goes fubar
function displayGenericError () {
    const genericErrorMessage = document.createElement("p");
    genericErrorMessage.style.position = "fixed";
    genericErrorMessage.style.bottom = "0";
    genericErrorMessage.style.right = "0";
    genericErrorMessage.style.margin = "0px";
    genericErrorMessage.style.border = "4px inset #ed7777";
    genericErrorMessage.style.backgroundColor = "#ff8080"
    const ErrorGif = document.createElement("img");
    ErrorGif.style.height = "2em";
    ErrorGif.src = "Resources/Page/Error.gif";
    genericErrorMessage.appendChild(ErrorGif);
    
    document.body.appendChild(genericErrorMessage);
    console.warn("Too many errors trying to switch the CSS. Terminating this script.");
}

window.onload = updateWindow;