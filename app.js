var document;

// Create web elements for each git data json file
const mainContent = document.createElement("div");
mainContent.className = "container mainStyle";
mainContent.id = `main`;

document.body.appendChild(mainContent);

var topLevelContentIndex = 0;
var subLevelContentIndex = 0;

// Determine, which json data set should be loaded to this page
const cheatCodeList = getCheatCodeList('list');
// Create content from one json
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
            // If the json was not loaded, throw error
            throw new Error(`readJSON Unable to fetch ${dataJson}. Status = ${response.status}`);
        }
        return response.json();
    })

    .then((data) => {
        // Populate the html with the data from the json.
        // To make Prism style the html that is being loaded, call Prism highlight function after after loading from the json and give some timeout.
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
        
            window.Prism.highlightAll();
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

    // Add Subtitle and short intro under that
    subtitleElement = createTextElement("h2", "cheatBlock", content.Subtitle);
    subList.appendChild(subtitleElement);
    introElement = createTextElement("div", "cheatBlock", content.Intro);
    subList.appendChild(introElement);
    
    if ("Cheats" in content) {
        // Add commands with their short explanations
        for (const cheat of content.Cheats) {
            const cheatBlockElement = document.createElement("div");
            cheatBlockElement.className = "cheatBlock";

            explanationElement = createTextElement("div", "cheatExplanationBlock", cheat.Explanation);
            cheatElement = createCodeBlock(cheat.Cheat, cheat.Class);

            cheatBlockElement.append(
                explanationElement,
                cheatElement
            );
            subList.appendChild(cheatBlockElement);
        }
    }
    
    newList.appendChild(subList);
    return;
}

function createTextElement(type, className, value, renderTagsAsHtml=true, replaceJsonFormatWithHtml=true){
    /**
    Creates a text element with given value
    The value is placed inside textContent, if the value includes '<' and '>' tags and renderTagsAsHtml is false.
    OR the value is placed inside innerHTML if such tags are not included.
    ATM Multiline html code snippets will not be shown correctly.
    */
    const element = document.createElement(type); // Would like this to be a explanation element type
    element.className = className;

    if (replaceJsonFormatWithHtml == true) {
        // Replace tabulator and line break with HTML equivalents
        value = String(value).replace(/\t/g, "&emsp;").replace(/\"/g, "").replace(/\n/g, "<br>");
    }

    if (renderTagsAsHtml == false ){
        // If <> is included, use textContext to avoid it becoming part of the DOM.
        element.textContent = value;
    } else {
        // Prism.highlightAll() needs the input in here.
        // innerHTML renders as html
        element.innerHTML = String(value);
    }
    return element;
}

function createCodeBlock(cheat, className){
    // A container for the code
    cheatElement = createTextElement("div", "codeBlock", "");

    // Prismjs requires pre element
    const preElement = document.createElement("pre");
    cheatElement.appendChild(preElement);

    /* Command lines in prismjs are done into the <pre> element
    Code languages are done into <code> elements inside pre elements.
    */
    if ("command-line".indexOf(className) !== -1){
        preElement.className = className;
        preElement.innerHTML = String(cheat);
    } else {
        // When using prism, the code syntax highlighting takes place if <pre><code class="language-[the language]">insert code here</code></pre>
        const codeTextElement = createTextElement("code", className, cheat, renderTagsAsHtml=false, replaceJsonFormatWithHtml=false);
        preElement.appendChild(codeTextElement);
    }

    // Add the copy icon
    svgIconContainer = createCopyIconSvg(cheat);
    cheatElement.appendChild(svgIconContainer);
    return cheatElement;
}

function createCopyIconSvg(cheat){
    /**
    Copy icon that acts as a button
    Includes event listener to copy the cheat code into clipboard

    The copy icon is from bootstrap. https://icons.getbootstrap.com/icons/copy/
    End result is this.
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
    </svg>
    */
    
    const container = document.createElement("div");
    container.className = "copyIcon";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // Styles
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("viewBox", "0 0 16 16");

    // Path
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute(
        "d",
        "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
    );
    // Append the path to the SVG
    svg.appendChild(path);
    
    // Copy the cheat code at onclick
    container.addEventListener("click", ()=>{
        copy(cheat);
    });
    container.appendChild(svg);
    return container;
}

function copy(cheat){
    navigator.clipboard.writeText(cheat);
}