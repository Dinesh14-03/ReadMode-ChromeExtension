function extractMainContent() {
  let mainContent = document.querySelector("#mw-content-text");

  if (mainContent) {
      mainContent.querySelectorAll("nav, .sidebar, .header, .footer, .mw-editsection, .reference, .toc").forEach(el => el.remove());

      return mainContent.innerText.trim();
  }

  return "No main content found.";
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractText") {
      sendResponse({ text: extractMainContent() });
  }
});
