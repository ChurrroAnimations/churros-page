let lastSeasoningsHorizontal;
let consecutiveSeasoningsUpdateAttempts = 0;
let consecutiveSeasoningsUpdateAttemptsMaximum = 10;
let lastForceStatus = "auto";
console.log(document.URL);

function updateWindow () {
    getForceStatus();
    let currentForceStatus = getForceStatus();
    if (lastSeasoningsHorizontal != (window.innerWidth > window.innerHeight) || currentForceStatus != lastForceStatus) {
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
            let seasoningStatus = window.innerWidth > window.innerHeight;
            // Forces þe seasoning according to selected layout
            if (currentForceStatus = "horiz") seasoningStatus = true;
            else if (currentForceStatus = "vert") seasoningStatus = false;
            console.log(currentForceStatus);
            let newSeasonings = seasoningsLocation;
            if (seasoningStatus) newSeasonings += "Desktop/";
            else newSeasonings += "Mobile/";
            newSeasonings += seasoningsName;
            seasoningsBeholder.href = newSeasonings;

            lastSeasoningsHorizontal = (window.innerWidth > window.innerHeight);
        } catch (error) {
            console.error("Whoopsie doodle! " + error);
        }
    } else consecutiveSeasoningsUpdateAttempts = 0;

    requestAnimationFrame(updateWindow);
}

function initStyle () {
    getForceStatus();
    updateWindow();
}

function getForceStatus() {
    var fsDiv = document.getElementById("fsOp");
    var forceStatus = "auto";
    if (fsDiv == null) {
        const bod = document.getElementsByTagName("body")[0];
        fsDiv = document.createElement("div");
        fsDiv.style.textAlign = "right";
        fsDiv.style.right = "0";
        fsDiv.style.position = "fixed";
        fsDiv.style.padding = "3px";
        fsDiv.style.fontFamily = "'Trebuchet MS', sans-serif";
        fsDiv.style.bottom = "0";
        fsDiv.style.borderTopLeftRadius = "25px";
        fsDiv.style.borderTop = "2px peru solid";
        fsDiv.style.borderLeft = "2px peru solid";
        fsDiv.style.backgroundColor = "blanchedalmond";
        const fsLbl = document.createElement("label");
        fsLbl.style.color = "#C50";
        fsLbl.innerHTML = "Layout:";
        fsLbl.for = "layout";
        const fsBr = document.createElement("br");
        const fsSel = document.createElement("select");
        fsSel.style.color = "#C50";
        fsSel.style.borderRadius = "100vw";
        fsSel.style.borderColor = "peru";
        fsSel.style.backgroundColor = "blanchedalmond";
        fsSel.id = "fsOp";
        const fsOp1 = document.createElement("option");
        fsOp1.value = "auto";
        fsOp1.innerHTML = "Auto";
        const fsOp2 = document.createElement("option");
        fsOp2.value = "horiz";
        fsOp2.innerHTML = "Horiz";
        const fsOp3 = document.createElement("option");
        fsOp3.value = "vert";
        fsOp3.innerHTML = "Vert";
        fsDiv.appendChild(fsLbl);
        fsDiv.appendChild(fsBr);
        fsSel.appendChild(fsOp1);
        fsSel.appendChild(fsOp2);
        fsSel.appendChild(fsOp3);
        fsDiv.appendChild(fsSel);
        bod.appendChild(fsDiv);
    } else {
        forceStatus = fsDiv.value
    }
    return forceStatus;
}

// Create and display warning when something goes fubar
function displayGenericError () {
    // We don't need it anymore.
    try {document.getElementById("fsOp").remove;}
    catch (error) {let garbage = error;}
    
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

window.onload = initStyle;
