const signMapping = {
    "hello": "20201013_211338.mp4",
    "accelerated": "accelerated.mp4",
    "seat": "Seat.mp4",
    "profile": "profile.mp4",
    "b": "b.png",
    "a": "a.png",
    "railwaystation":"railwaystation.mp4",
    "you":"you.mp4",
    "your":"your.mp4",
    "itself":"itself.mp4",
    "interview":"Interview.mp4",
    "harvest":"harvest.mp4",
    "introduction":"Introduction.mp4",
    "fruit":"fruits.mp4",
    "hydro energy":"Hydro Energy.mp4",
    "yourself":"yourself.mp4",
    "track":"track.mp4",
    "thankyou":"thank you.mp4",
    "train":"train.mp4",
    "that":"that.mp4"
  };
  
  
  // Start speech recognition
  function startSpeechRecognition() {
    const output = document.getElementById("spokenText");
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    output.textContent = "Listening...";
    recognition.start();
  
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      output.textContent = `You said: "${transcript}"`;
      translateToSign(transcript);
    };
  
    recognition.onerror = function (event) {
      output.textContent = "Error: " + event.error;
    };
  }
  
  function preprocessText(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
  }
  
  // Play media (video/image) in sequence
  function playMediaSequence(mediaList, container) {
    let index = 0;
  
    function playNext() {
      container.innerHTML = ""; // Clear previous content
      if (index >= mediaList.length) return;
  
      const mediaItem = mediaList[index];
      const ext = mediaItem.split('.').pop().toLowerCase();
  
      if (["mp4", "webm"].includes(ext)) {
        const video = document.createElement("video");
        video.src = mediaItem;
        video.width = 400;
        video.height = 260;
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.style.borderRadius = "8px";
        video.style.margin = "0.5rem";
        container.appendChild(video);
  
        video.onended = () => {
          index++;
          playNext();
        };
      } else if (["png", "jpg", "jpeg"].includes(ext)) {
        const img = document.createElement("img");
        img.src = mediaItem;
        img.alt = "sign image";
        img.style.height = "300px";
        img.style.margin = "0.5rem";
        img.style.borderRadius = "8px";
        container.appendChild(img);
  
        setTimeout(() => {
          index++;
          playNext();
        }, 1500); // Show image for 1.5 seconds
      } else {
        index++;
        playNext();
      }
    }
  
    playNext();
  }
  
  function translateToSign(text) {
    const tokens = preprocessText(text);
    const outputDiv = document.getElementById("signOutput");
    const mediaList = [];
  
    tokens.forEach(word => {
      const mediaPath = signMapping[word];
      if (mediaPath) {
        mediaList.push(mediaPath);
      } else {
        const span = document.createElement("span");
        span.textContent = `[${word}]`;
        span.style.color = "red";
        span.style.margin = "10px";
        outputDiv.appendChild(span);
      }
    });
  
    if (mediaList.length > 0) {
      playMediaSequence(mediaList, outputDiv);
    }
  }
  
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
  
    translateToSign(inputText);
  }
  