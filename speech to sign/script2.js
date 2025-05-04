const signMapping = {
  "hello": "20201013_211338.mp4",
  "railway station": "Railway_Station(1).mp4",
  "accelerated": "accelerated.mp4",
  "seat": "Seat.mp4",
  "profile": "profile.mp4",
  "b": "b.png",
  "a": "a.png"
};
function startSpeechRecognition() {
  const output = document.getElementById("spokenText");
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  output.textContent = "Listening...";

  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    output.textContent = `You said: "${transcript}"`;
    translateToSign(transcript);
  };

  recognition.onerror = function(event) {
    output.textContent = "Error: " + event.error;
  };
}

// Text preprocessing
function preprocessText(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
}

// Translation logic: handles both video and image sources
function translateToSign(text) {
  const tokens = preprocessText(text);
  const outputDiv = document.getElementById("signOutput");
  outputDiv.innerHTML = "";

  tokens.forEach(word => {
    const mediaPath = signMapping[word];
    if (mediaPath) {
      const ext = mediaPath.split('.').pop().toLowerCase();

      if (["mp4", "webm"].includes(ext)) {
        // Handle video
        const video = document.createElement("video");
        video.src = mediaPath;
        video.width = 400;
        video.height = 260;
        video.autoplay = true;
        video.loop = false;
        video.muted = true;
        video.playsInline = true;
        video.style.borderRadius = "8px";
        video.style.margin = "0.5rem";
        outputDiv.appendChild(video);
      } else if (["png", "jpg", "jpeg"].includes(ext)) {
        // Handle image
        const img = document.createElement("img");
        img.src = mediaPath;
        img.alt = word;
        img.style.height = "300px";
        img.style.margin = "0.5rem";
        img.style.borderRadius = "8px";
        outputDiv.appendChild(img);
      }
    } else {
      // Word not found in mapping
      const span = document.createElement("span");
      span.textContent = `[${word}]`;
      span.style.color = "red";
      span.style.margin = "10px";
      outputDiv.appendChild(span);
    }
  });
}
