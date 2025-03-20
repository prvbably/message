document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  
    const audio = document.getElementById("audio");
    const playPauseBtn = document.getElementById("play-pause");
    const progressBar = document.querySelector(".progress");
  
    playPauseBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "Pause";
      } else {
        audio.pause();
        playPauseBtn.textContent = "Play";
      }
    });
  
    audio.addEventListener("timeupdate", () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = percentage + "%";
    });
  
    const poemParagraphs = document.querySelectorAll(".poem p");
  
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
  
    poemParagraphs.forEach(p => {
      observer.observe(p);
    });
  });
  