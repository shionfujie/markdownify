var coll = document.querySelectorAll('ul, ol')
setup();

function setup() {
    addListeners();
    injectCSS();
}

function teardown() {
    removeListeners();
    removeCSS();
}

function addListeners() {
    for (const list of coll) {
        list.addEventListener("click", extractLinks);
    }
}

function removeListeners() {
    for (const list of coll) {
        list.removeEventListener("click", extractLinks);
    }
}

function injectCSS() {
    const style = document.createElement("style");
    const styleText = document.createTextNode(" ul:hover, ol:hover { background: #b3e5fc; }")
    style.id = 'markdownify:style'
    style.appendChild(styleText);
    document.head.appendChild(style);
}

function removeCSS() {
    var cssNode = document.getElementById("markdownify:style");
    cssNode && cssNode.parentNode.removeChild(cssNode);
}

function extractLinks(e) {
    e.preventDefault();
    const list = e.currentTarget;
    var clip = ''
    for (const a of list.querySelectorAll('a')) {
        clip += `- [${a.textContent}](${a.href})\n`;
    }
    if (navigator.clipboard === undefined) {
        console.debug("extractLink: clip: ", clip)
        console.debug("extractLink: navigator.clipboard is not available")
    } else {
        navigator.clipboard.writeText(clip);
    }
    teardown();
}