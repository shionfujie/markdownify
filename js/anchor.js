
addListeners()

function addListeners() {
    for (const anchor of document.getElementsByTagName('a')) {
        anchor.addEventListener('click', extractLink)
    }
}

function extractLink(e) {
    e.preventDefault()
    const el = e.target
    const newClip = `[${el.textContent}](${el.href})`
    navigator.clipboard.writeText(newClip)
    teardown()
}

function teardown() {
    for (const anchor of document.getElementsByTagName('a')) {
        anchor.removeEventListener('click', extractLink)
    }
}