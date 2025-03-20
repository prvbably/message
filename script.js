document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
    });
  
    const audio = document.getElementById("audio");
    const playPauseBtn = document.getElementById("play-pause");
    const progressBar = document.querySelector(".progress");
  
    playPauseBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = "&#10074;&#10074;";
      } else {
        audio.pause();
        playPauseBtn.innerHTML = "&#9654;";
      }
    });
  
    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percentage + "%";
      }
    });
  
    const volumeControl = document.getElementById("volume");
    volumeControl.addEventListener("input", () => {
      audio.volume = volumeControl.value;
    });
  
    const poemParagraphs = document.querySelectorAll(".poem p");
    poemParagraphs.forEach(p => {
      const lines = p.innerHTML.split("<br>");
      p.innerHTML = "";
      lines.forEach((line, index) => {
        const span = document.createElement("span");
        span.className = "line";
        span.innerHTML = line;
        p.appendChild(span);
        if (index < lines.length - 1) {
          p.appendChild(document.createElement("br"));
        }
      });
    });
  
    const poemLines = document.querySelectorAll(".poem .line");
    const observerOptions = {
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    poemLines.forEach(line => {
      observer.observe(line);
    });
  
    audio.play().catch(error => {
      console.log("Autoplay failed: ", error);
    });
  });  