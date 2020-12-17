setup();

function setup() {
  addListeners();
  injectCSS();
}

function addListeners() {
  for (const anchor of document.getElementsByTagName("a")) {
    anchor.addEventListener("click", extractLink);
  }
}

function removeListeners() {
  for (const anchor of document.getElementsByTagName("a")) {
    anchor.removeEventListener("click", extractLink);
  }
}

function extractLink(e) {
  e.preventDefault();
  const el = e.currentTarget;
  const newClip = `[${el.textContent}](${el.href})`;
  if (navigator.clipboard === undefined) {
    console.debug("extractLink: newClip: ", newClip)
    console.debug("extractLink: navigator.clipboard is not available")
  } else {
    navigator.clipboard.writeText(newClip);
  }
  teardown();
}

function injectCSS() {
  const style = document.createElement("style");
  const styleText = document.createTextNode(" a:hover { background: #b3e5fc; }")
  style.id = 'markdownify:style'
  style.appendChild(styleText);
  document.getElementsByTagName("head")[0].appendChild(style);
}

function removeCSS() {
  var cssNode = document.getElementById("markdownify:style");
  cssNode && cssNode.parentNode.removeChild(cssNode);
}

function teardown() {
  removeListeners();
  removeCSS();
}
