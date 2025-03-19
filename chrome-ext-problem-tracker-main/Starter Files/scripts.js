let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let rateSlider = document.querySelector("#rate");
let rateDisplay = document.querySelector("#rateValue");
let textArea = document.querySelector("textarea");

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    
    if (voices.length > 0) {
        let selectedIndex = voiceSelect.selectedIndex >= 0 ? voiceSelect.selectedIndex : 0;
        voiceSelect.innerHTML = "";

        voices.forEach((voice, i) => {
            let option = new Option(voice.name, i);
            voiceSelect.appendChild(option);
        });

        voiceSelect.selectedIndex = selectedIndex;
        speech.voice = voices[selectedIndex];
    }
}

window.speechSynthesis.onvoiceschanged = loadVoices; 
loadVoices();

voiceSelect.addEventListener("change", () => {
    let selectedIndex = parseInt(voiceSelect.value);
    if (selectedIndex >= 0 && selectedIndex < voices.length) {
        speech.voice = voices[selectedIndex];
    }
});

rateSlider.addEventListener("input", () => {
    speech.rate = parseFloat(rateSlider.value);
    rateDisplay.textContent = rateSlider.value + "x"; 
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
        { target: { tabId: tabs[0].id }, files: ["content.js"] },
        () => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "extractText" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else if (response && response.text) {
                    document.querySelector("textarea").value = response.text;
                }
            });
        }
    );
});


setTimeout(() => {
    if (voices.length === 0) {
        loadVoices();
    }
}, 500);
