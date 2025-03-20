let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let rateSlider = document.querySelector("#rate");
let rateDisplay = document.querySelector("#rateValue");
let textArea = document.querySelector("textarea");
let isPaused = true;

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

document.querySelector("#convert").addEventListener("click", () => {
    let textToSpeak = textArea.value.trim();

    if (textToSpeak === "") {
        alert("Please enter some text to read aloud!");
        return;
    }

    showOverlay(); 

    speech.text = textToSpeak;
    window.speechSynthesis.speak(speech);

    setTimeout(hideOverlay, 3000);
});

document.querySelector("#pause").addEventListener("click", () => {
    window.speechSynthesis.pause();
    isPaused = true;
});

document.querySelector("#resume").addEventListener("click", () => {
    if (isPaused) {
        window.speechSynthesis.resume();
        isPaused = false;
    }
});

let overlay = document.getElementById("overlay");
let closeOverlay = document.getElementById("closeOverlay");

function showOverlay() {
    overlay.style.display = "flex";
}

function hideOverlay() {
    overlay.style.display = "none";
}

closeOverlay.addEventListener("click", hideOverlay);

document.querySelector("#summarize").addEventListener("click", async () => {
    let textToSummarize = textArea.value.trim();

    if (textToSummarize === "") {
        alert("Please enter some text to summarize!");
        return;
    }

    showOverlay(); 

    try {
        let summarizedText = await summarizeTextWithGeminiAPI(textToSummarize);
        textArea.value = summarizedText;
    } catch (error) {
        console.error("Error summarizing text:", error);
    }

    hideOverlay();
});

async function summarizeTextWithGeminiAPI(text) {
    const apiKey = 'AIzaSyCbV29eqxP9iJuccawRzPHRQ7N6QoesT1Y'; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
   
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text }] }]
        })
    });

    if (!response.ok) {
        throw new Error('Failed to summarize text');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Summarization failed.";
}


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