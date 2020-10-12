chrome.runtime.onMessageExternal.addListener((request, _, response) => {
  if (request.type === "action spec") {
    response({
      name: actionSpec.name,
      actions: Object.entries(actionSpec.actions).map(
        ([name, { displayName }]) => {
          return { name, displayName };
        }
      )
    });
  } else if (request.type === "execute action") {
    const action = actionSpec.actions[request.action.name];
    if (action !== undefined) action.f();
  }
});

const actionSpec = {
  name: "Markdownify",
  actions: {
    "clip links": {
      displayName: "Markdownify: Copy Selected Pages' URLs",
      f: requestClipPageURLs
    },
    "extract anchor": {
      displayName: "Markdownify: Copy Anchor's Link",
      f: injectAnchorExtractor
    }
  }
};

function requestClipPageURLs() {
    chrome.tabs.query({currentWindow: true, highlighted: true}, tabs => {
        // Parse tabs to a list of links in markdown
        const clip = tabs.map(({title, url}) => `- [${title}](${url})`)
            .join("\n")
        // Request to copy it to the clipboard
        sendMessageToActiveTab({type: 'clip', clip})
    })
}

function injectAnchorExtractor() {
  chrome.tabs.insertCSS({file: '/css/anchor.css'})
  chrome.tabs.executeScript({file: '/js/anchor.js'})
}