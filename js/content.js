chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case "clip":
      clip(message.clip);
      break;
  }
});

function clip(newClip) {
  if (navigator.clipboard === undefined) {
    console.debug("extractLink: newClip: ", newClip)
    console.debug("extractLink: navigator.clipboard is not available")
  } else {
    navigator.clipboard.writeText(newClip);
  }
}