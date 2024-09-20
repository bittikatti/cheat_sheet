var document;

// Create web elements for each git data json file
// Title:
const titleList = document.createElement("class");
titleList.className = "cheatCodeCollection";
titleList.id = `cheatCodeCollection${0}`;
document.body.appendChild(titleList);
const titleElement = document.createElement("h1");
titleElement.textContent = "Git"
titleList.appendChild(titleElement);

const git_data_jsons = ["git_not_in_your_mahcine", "revert_reset"];
var index = 1;
for (var path of git_data_jsons) {
    populateFromJson(`data/git/${path}.json`, index)
    index = index + 1;
}

function populateFromJson(data_json_path, index){
    // Fetch data from json file
    const myList = document.createElement("class");
    myList.className = "cheatCodeCollection";
    myList.id = `cheatCodeCollection${index}`;
    document.body.appendChild(myList);
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
        document.body.insertAfter(p, myList);
    });
}

