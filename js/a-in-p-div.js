var selector = "p,div,li,dd,td"
var capturing = undefined

setup();

function setup() {
    addListeners();
}

function addListeners() {
    for (const el of document.querySelectorAll(selector)) {
        el.addEventListener("mouseover", highlightBackground)
        el.addEventListener("click", takeLinksWithin)
    }
}

function removeListeners() {
    for (const el of document.querySelectorAll(selector)) {
        el.removeEventListener("mouseover", highlightBackground);
        el.removeEventListener("click", takeLinksWithin)
    }
}

function highlightBackground(ev) {
    const el = ev.currentTarget
    ev.stopPropagation()
    if (capturing !== undefined) {
        capturing.style["background"] = ""
    }
    el.style["background"] = "#b3e5fc"
    capturing = el
}

function takeLinksWithin(ev) {
    const el = ev.currentTarget
    ev.stopPropagation()
    const text = Array.from(el.querySelectorAll("a"))
        .map(a => `- [${Title(a.textContent.trim())}](${a.href})`)
        .join("\n")

    console.debug("takeLinksWithin: Attempt to copy to clipboard")
    clip(text)

    teardown()
}

function Title(text) {
    var result = ""
    for (const word of text.split(/([^\w’']+)/)) {
        result += word.charAt(0).toUpperCase() + word.substring(1)
    }
    return result
}

function clip(text) {
    if (navigator.clipboard === undefined) {
        console.debug("clip: text: ", text)
        console.debug("clip: navigator.clipboard is not available")
    } else {
        navigator.clipboard.writeText(text);
    }
}

function teardown() {
    if (capturing !== undefined) {
        capturing.style["background"] = ""
    }
    removeListeners()
}
