function extractText() {
  let text = document.body.innerText.trim();
  return text.length > 5000 ? text.slice(0, 5000) + "..." : text; // Limit length
}

// Send extracted text to the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractText") {
      sendResponse({ text: extractText() });
  }
});