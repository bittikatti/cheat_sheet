var document;

function populateFromJson(data_json_path){
    // Fetch data from json file
    const myList = document.querySelector("div");
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

// Create web elements for each git data json file
const git_data_jsons = ["git_not_in_your_mahcine", "revert_reset"];
for (var path of git_data_jsons) {
    populateFromJson(`data/git/${path}.json`)
}