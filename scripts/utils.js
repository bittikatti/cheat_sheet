export function createTextElement(type, className, value, renderTagsAsHtml=true, replaceJsonFormatWithHtml=true){
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