var document;

// Create web elements for each git data json file
const mainContent = document.createElement("div");
mainContent.className = "container mainStyle";
mainContent.id = `main`;

document.body.appendChild(mainContent);

var topLevelContentIndex = 0;
var subLevelContentIndex = 0;

// Create content from one json
readJSON(`data/cat.json`);


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
            // If the json was not loaded, throw error
            throw new Error(`readJSON Unable to fetch ${dataJson}. Status = ${response.status}`);
        }
        return response.json();
    })

    .then((data) => {
        // Populate the html with the data from the json.
        setTimeout(
            () => {
                // Create one top level title for this json
                subtitleElement = createTextElement("h1", "cheatBlock", data.Heading1);
                newList.appendChild(subtitleElement);
                
                for (var content of data.Contents){
                    //Create sub content on subtitle level
                    populateFromContentDict(newList, content, subLevelContentIndex);
                    subLevelContentIndex = subLevelContentIndex + 1;
                }
            },
            1
        );
        
        
    })
    .catch((error) => {
        // Write any error into the DOM
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(`Error: ${error.message}`));
        document.body.insertBefore(p, mainContent);
    });
}

function populateFromContentDict(newList, content, subLevelContentIndex){
    // Create subheading with list of commands and their explanations.
    
    const subList = document.createElement("div");
    subList.className = "cheatCodeCollection";
    subList.id = `cheatCodeCollection${subLevelContentIndex}`;

    // Add Subtitle
    subtitleElement = createTextElement("h2", "cheatBlock", content.Caption);
    subList.appendChild(subtitleElement);
    newList.appendChild(subList);

    // Add image
    const imageElement = document.createElement("img");
    imageElement.className = "catContainer";
    imageElement.src = `data/cat/${content.Path}`;
    imageElement.alt = content.Path;
    newList.appendChild(imageElement);
    return;
}

function createTextElement(type, className, value){
    /**
    Creates a text element with given value
    */
    const element = document.createElement(type); // Would like this to be a explanation element type
    element.className = className;
    element.innerHTML = String(value);
    return element;
}