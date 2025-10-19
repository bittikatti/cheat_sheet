var document;

// Create web elements for each git data json file
const mainContent = document.createElement("class");
mainContent.className = "mainStyle";
mainContent.id = `main`;

document.body.appendChild(mainContent);

//Create content from one json
var topLevelContentIndex = 0;
var subLevelContentIndex = 0;

const cheatCodeList = getCheatCodeList('list');
readJSON(`data/${cheatCodeList}.json`);

function getCheatCodeList(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function readJSON(dataJson, topLevelContentIndex){
    // Create container for one json data
    const newList = document.createElement("class");
    newList.className = "cheatCodeCollection";
    newList.id = `topLevelCheatCodeCollection${topLevelContentIndex}`;

    // Find element with main id and add new class `cheatCodeCollection${index}` to it.
    mainContent.appendChild(newList);

    fetch(dataJson)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`readJSON Unable to fetch ${dataJson}. Status = ${response.status}`);
        }
        return response.json();
    })

    .then((data) => {
        // Create one top level title for this json
        subtitleElement = createTextElement("h1", "cheatBlock", data.Heading1);
        newList.appendChild(subtitleElement);
        
        for (var content of data.Contents){
            //Create sub content on subtitle level
            populateFromContentDict(newList, content, subLevelContentIndex);
            subLevelContentIndex = subLevelContentIndex + 1;
        }
        
    })
    .catch((error) => {
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(`Error: ${error.message}`));
        document.body.insertBefore(p, titleList);
    });
}

function populateFromContentDict(newList, content, subLevelContentIndex){
    // Create subheading with list of commands and their explanations.
    
    const subList = document.createElement("class");
    subList.className = "cheatCodeCollection";
    subList.id = `cheatCodeCollection${subLevelContentIndex}`;

    // Add Subtitle and short intro under that
    subtitleElement = createTextElement("h2", "cheatBlock", content.Subtitle);
    subList.appendChild(subtitleElement);
    introElement = createTextElement("div", "cheatBlock", content.Intro);
    subList.appendChild(introElement);

    // Add commands with their short explanations
    for (const cheat of content.Cheats) {
        const cheatBlockElement = document.createElement("div");
        cheatBlockElement.className = "cheatBlock";

        explanationElement = createTextElement("div", "cheatExplanationBlock", cheat.Explanation);
        cheatElement = createTextElement("div", "codeBlock", cheat.Cheat);

        cheatBlockElement.append(
            explanationElement,
            cheatElement
    );
    subList.appendChild(cheatBlockElement);
    newList.appendChild(subList);
    }
}

function createTextElement(type, className, value){
    const element = document.createElement(type); // Would like this to be a explanation element type
    element.className = className;
    element.textContent = value;
    return element;
}

