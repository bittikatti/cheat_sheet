var document;

// Create web elements for each git data json file
// Title:
const titleList = document.createElement("class");
titleList.className = "mainStyle";
titleList.id = `main`;
document.body.appendChild(titleList);
const titleElement = document.createElement("h1");
titleElement.textContent = "Git"
titleList.appendChild(titleElement);


// Create contents from jsons
const git_data_jsons = ["git_not_in_your_mahcine", "revert_reset", "log_commands"];
var index = 0;
for (var path of git_data_jsons) {
    populateFromJson(`data/git/${path}.json`, index)
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
        subtitleElement.textContent = data.Subtitle
        myList.appendChild(subtitleElement);

        // Intro under the subtitle
        const introElement = document.createElement("p");
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
    })
    .catch((error) => {
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(`Error: ${error.message}`));
        document.body.insertBefore(p, myList);
    });
}

