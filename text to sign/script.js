const signMapping = {
  "hello": "20201013_211338.mp4",
  "railway station": "Railway_Station(1).mp4",
  "accelerated": "accelerated.mp4",
  "seat": "Seat.mp4",
  "profile": "profile.mp4",
  "b": "b.png",
  "a": "a.png"
};
function preprocessText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove punctuation
    .split(/\s+/) // tokenize
    .filter(Boolean); // remove empty strings
}

// Main function: converts text input to sign language media
function convertTextToSign() {
  const inputText = document.getElementById("textInput").value.trim();
  const outputDiv = document.getElementById("signOutput");
  const statusMsg = document.getElementById("statusMsg");

  outputDiv.innerHTML = "";
  statusMsg.textContent = "";

  if (!inputText) {
    statusMsg.textContent = "Please enter some text.";
    return;
  }

  const tokens = preprocessText(inputText);

  tokens.forEach(word => {
    const mediaPath = signMapping[word];

    if (mediaPath) {
      const fileExtension = mediaPath.split('.').pop().toLowerCase();

      if (["mp4", "webm"].includes(fileExtension)) {
        // Create and configure video element
        const video = document.createElement("video");
        video.src = mediaPath;
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.loop = false;
        video.controls = false;
        video.width = 400;
        video.height = 260;
        video.style.margin = "0.5rem";
        video.style.borderRadius = "8px";
        outputDiv.appendChild(video);
      } else if (["png", "jpg", "jpeg"].includes(fileExtension)) {
        // Create and configure image element
        const img = document.createElement("img");
        img.src = mediaPath;
        img.alt = word;
        img.style.height = "200px";
        img.style.margin = "1rem";
        img.style.borderRadius = "8px";
        outputDiv.appendChild(img);
      }
    } else {
      // Display unknown word in red
      const span = document.createElement("span");
      span.textContent = `[${word}]`;
      span.style.color = "red";
      span.style.fontWeight = "bold";
      span.style.margin = "0.5rem";
      outputDiv.appendChild(span);
    }
  });
}