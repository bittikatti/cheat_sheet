const myList = document.querySelector("div");
var listPath = "data/git/git_not_in_your_mahcine.json"
fetch(listPath)
.then((response) => {
    if (!response.ok) {
        throw new Error(`Unable to fetch ${listPath}. Status = ${response.status}`);
    }
    return response.json();
})
.then((data) => {
    // Add Subtitle
    const subtitleElement = document.createElement("h3");
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
        cheatBlockElement.className = "cheatExplanationBlock";
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