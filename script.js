const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('fileInput');
const videoPlayer = document.getElementById('videoPlayer');

// CLICK to open file picker
dropZone.addEventListener('click', () => {
  fileInput.click(); 
});

// HANDLE FILE PICKED via input
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file && file.type.startsWith('video/')) {
    const videoURL = URL.createObjectURL(file);
    videoPlayer.src = videoURL;
   
  } else {
    alert('Please select a valid video file.');
  }
});

// DRAG OVER
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('hover');
});

// DRAG LEAVE
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('hover');
});

// DROP FILE
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('hover');

  const file = e.dataTransfer.files[0];
  console.log(e,file)

  if (file && file.type.startsWith('video/')) {
    const videoURL = URL.createObjectURL(file);
    console.log(videoURL)
    videoPlayer.src = videoURL;
    
  } else {
    alert('Please drop a valid video file (.mp4, .webm, etc.)');
  }
});
 
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault(); // prevent scrolling
  
      if (videoPlayer.paused) {
        videoPlayer.play(); // ▶️ Play if paused
      } else {
        videoPlayer.pause(); // ⏸️ Pause if playing
      }
    }
  });

const timeline = document.getElementById('timeline');

// Wait for video metadata to load
videoPlayer.addEventListener('loadedmetadata', () => {
  timeline.max = videoPlayer.duration;
});

// Update timeline while playing
videoPlayer.addEventListener('timeupdate', () => {
  timeline.value = videoPlayer.currentTime;
});

// Scrub video when timeline is changed
timeline.addEventListener('input', () => {
    videoPlayer.currentTime = timeline.value;
});
