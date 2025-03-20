# Readify - Text-to-Speech Chrome Extension  

**Readify** is a Chrome extension that extracts and summarizes webpage content for text-to-speech (TTS) conversion.  
It helps users listen to key information without distractions and supports multiple languages and voices.  

## Features  

- **Extracts main content** from webpages, removing unwanted text.  
- **Summarizes text using Gemini AI**, focusing on important events without headings.  
- Supports **multiple voices (male and female)** with adjustable speech rate.  
- Provides **pause, resume, and speed control** for TTS playback.  
- Simple UI with a **Summarize** button to condense extracted content.  

## Installation  

1. **Download or clone** this repository.  
2. Open Chrome and go to `chrome://extensions/`.  
3. Enable **Developer mode** (toggle in the top right corner).  
4. Click **Load unpacked** and select the project folder.  
5. **Pin Readify** from the extensions menu for easy access.  

## How to Use  

- **Extract Content**: Open a webpage and click the **Readify** icon.  
- **Summarize**: Click **Summarize** to get a concise version of the page.  
- **Convert to Speech**: Click **Convert** to listen to the extracted or summarized text.  
- **Control Playback**: Use **Pause** and **Resume** to manage speech.  

## Technical Overview  

### `manifest.json`  
- Defines **extension permissions and icons**.  
- Includes **background scripts** and **content scripts**.  

### `content.js`  
- Extracts **the main content** from webpages.  

### `script.js`  
- Manages **TTS conversion, summarization, and UI interactions**.  
- Uses **Google Gemini AI** for smart summarization.  

### `popup.html`  
- UI for interacting with **Readify**.  

## Future Enhancements  

- **Add dark mode** for a better UI experience.  
- **Support more summarization models** for better accuracy.  
- **Improve content extraction** to handle more complex page structures.  

## License  

This project is open-source under the **MIT License**.  
