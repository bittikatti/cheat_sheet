var document;

// Create web elements for each git data json file
const mainContent = document.createElement("class");
mainContent.className = "mainStyle";
mainContent.id = `main`;

document.body.appendChild(mainContent);

//Create content from one json
var topLevelContentIndex = 0;
var subLevelContentIndex = 0;
var dataJson = "git";
dataJsonPath = `data/${dataJson}.json`;
readJSON(dataJsonPath);

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
        const subtitleElement = document.createElement("h1");
        subtitleElement.className = "cheatBlock";
        subtitleElement.textContent = data.Heading1;
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

    const subList = document.createElement("class");
    subList.className = "cheatCodeCollection";
    subList.id = `cheatCodeCollection${subLevelContentIndex}`;

    // Add Subtitle
    const subtitleElement = document.createElement("h2");
    subtitleElement.className = "cheatBlock";
    subtitleElement.textContent = content.Subtitle;
    subList.appendChild(subtitleElement);

    // Intro under the subtitle
    const introElement = document.createElement("div");
    introElement.className = "cheatBlock";
    introElement.textContent = content.Intro;
    subList.appendChild(introElement);

    // Contents
    for (const cheat of content.Cheats) {
        const cheatBlockElement = document.createElement("div");
        cheatBlockElement.className = "cheatBlock";

        const explanationElement = document.createElement("div"); // Would like this to be a explanation element type
        explanationElement.className = "cheatExplanationBlock";
        explanationElement.textContent = cheat.Explanation;

        const cheatElement = document.createElement("div"); // Would like this to be a code block element type
        cheatElement.className = "codeBlock";
        cheatElement.textContent = cheat.Cheat;

        cheatBlockElement.append(
            explanationElement,
            cheatElement
    );
    subList.appendChild(cheatBlockElement);

    newList.appendChild(subList);
    }
}


