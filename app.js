var document;

// Create web elements for each git data json file
const mainContent = document.createElement("class");
mainContent.className = "mainStyle";
mainContent.id = `main`;

document.body.appendChild(mainContent);

//Create content from one json
var topLevelContentIndex = 0;
var dataJson = "git";
dataJsonPath = `data/${dataJson}.json`;
readJSON(dataJsonPath);

function readJSON(dataJson, topLevelContentIndex){
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
        const subtitleElement = document.createElement("h1");
        subtitleElement.className = "cheatBlock";
        subtitleElement.textContent = data.Heading1;
        newList.appendChild(subtitleElement);

        testAddingOneBlock(data.Contents, newList)
        
    })
    .catch((error) => {
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(`Error: ${error.message}`));
        document.body.insertBefore(p, titleList);
    });
}

function testAddingOneBlock(contents, newList){
    // Add a cheat block with content size as 
    const introElement = document.createElement("div");
    introElement.className = "cheatBlock"
    introElement.textContent = `contents length ${contents.length}`;
    newList.appendChild(introElement);
}

// Create contents from jsons
const git_data_jsons = ["git_not_in_your_mahcine", "revert_reset_regular_commits", "revert_reset_merges","log_commands", "branches"];
var index = 0;
for (var path of git_data_jsons) {
    //populateFromJson(`data/git/${path}.json`, index)
    index = index + 1;
}

function populateFromJson(data_json_path, index){
    // Fetch data from json file

    const myList = document.createElement("class");
    myList.className = "cheatCodeCollection";
    myList.id = `cheatCodeCollection${index}`;

    // Find element with main id and add new class `cheatCodeCollection${index}` to it.
    const mainElement = document.querySelector("[id^=main]");
    mainElement.appendChild(myList);

    // Populate the `cheatCodeCollection${index}` with json data
    fetch(data_json_path)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Unable to fetch ${data_json_path}. Status = ${response.status}`);
        }
        return response.json();
    })

    // Feed the data to html
    .then((data) => {
        // Add Subtitle
        const subtitleElement = document.createElement("h2");
        subtitleElement.className = "cheatBlock"
        subtitleElement.textContent = data.Subtitle
        myList.appendChild(subtitleElement);

        // Intro under the subtitle
        const introElement = document.createElement("div");
        introElement.className = "cheatBlock"
        introElement.textContent = data.Intro
        myList.appendChild(introElement);

        // Contents
        for (const cheat of data.Cheats) {
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
        myList.appendChild(cheatBlockElement);
        }
        document.body.appendChild(myList);
    })
    .catch((error) => {
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(`Error: ${error.message}`));
        document.body.insertBefore(p, myList);
    });
}

