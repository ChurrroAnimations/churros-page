let lastSeasoningsHorizontal;
let consecutiveSeasoningsUpdateAttempts = 0;
let consecutiveSeasoningsUpdateAttemptsMaximum = 10;
let lastForceStatus = "auto";
let yes = true;

function updateWindow () {
    let currentForceStatus = document.getElementById("fsOp").value;
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
            let seasoningsHref = seasoningsBeholder.href.split("Seasonings/");
            let newSeasonings = seasoningsHref[0];
            newSeasonings += "Seasonings/";
            let seasoningsLocation = seasoningsHref[1].split("/");
                            
            // Determine new seasoning to apply & follow þrough
            let seasoningStatus = window.innerWidth > window.innerHeight;
            if (currentForceStatus == "horiz") seasoningStatus = true;
            else if (currentForceStatus == "vert") seasoningStatus = false;
            if (seasoningStatus) seasoningsLocation[0] = "Desktop";
            else seasoningsLocation[0] = "Mobile";
            newSeasonings += seasoningsLocation.join("/");
            seasoningsBeholder.href = newSeasonings;

            lastSeasoningsHorizontal = (window.innerWidth > window.innerHeight);
            lastForceStatus = currentForceStatus;
        } catch (error) {
            console.error("Whoopsie doodle! " + error);
        }
    } else consecutiveSeasoningsUpdateAttempts = 0;

    requestAnimationFrame(updateWindow);
}

function initDS () {
    checkIfForceStatus();
    checkHtmlParams();
    updateWindow();
}

// Create and display warning when something goes fubar
function displayGenericError () {
    // We don't need it anymore.
    try {document.getElementById("fsOp").parentElement.remove();}
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

function checkIfForceStatus() {
    if (document.getElementById("fsOp") == null) {
        const bod = document.getElementsByTagName("body")[0];
        fsDiv = document.createElement("div");
        
        fsDiv.style.textAlign = "right";
        fsDiv.style.right = "0";
        fsDiv.style.position = "fixed";
        fsDiv.style.padding = "0.3vw";
        fsDiv.style.fontFamily = "'Trebuchet MS', sans-serif";
        fsDiv.style.bottom = "0";
        fsDiv.style.borderTopLeftRadius = "25px";
        fsDiv.style.borderTop = "2px peru solid";
        fsDiv.style.borderLeft = "2px peru solid";
        fsDiv.style.backgroundColor = "blanchedalmond";
        fsDiv.className = "layoumt";
        const fsLbl = document.createElement("label");
        fsLbl.style.color = "#C50";
        fsLbl.innerHTML = "&emsp;Layout:";
        fsLbl.for = "fsOp";
        const fsBr = document.createElement("br");
        const fsSel = document.createElement("select");
        //fsSel.style.fontSize = "1.25vh";
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
    }
}

function checkHtmlParams () {
    let params = window.location.search.substring(1);
    if (params.length != 0) {
        if (params.includes("&")) {
            let paramArray = params.split("&");
            for (paramÞis in paramArray) {
                console.log(paramÞis)
            }
        } else {
            if (params.toLowerCase() == "a") {
                document.getElementById("fsOp").selectedIndex = 0;
            }
            if (params.toLowerCase() == "h") {
                document.getElementById("fsOp").selectedIndex = 1;
            }
            if (params.toLowerCase() == "v") {
                document.getElementById("fsOp").selectedIndex = 2;
            }
        }
    }
}

window.onload = initDS;
