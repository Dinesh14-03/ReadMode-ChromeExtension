function extractMainContent() {
  let mainContent = document.querySelector("article, #mw-content-text"); 
  if (mainContent) {
      return mainContent.innerText;
  }
  return "No main content found.";
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractText") {
      sendResponse({ text: extractMainContent() });
  }
});
