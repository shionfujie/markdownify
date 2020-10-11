chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case "clip":
      clip(message.clip);
      break;
  }
});

function clip(newClip) {
    navigator.clipboard.writeText(newClip)
}