const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
// Get the necessary DOM elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playButton = player.querySelector('.toggle');
const volumeSlider = player.querySelector('input[name="volume"]');
const playbackSpeedSlider = player.querySelector('input[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');

// Function to toggle play/pause of the video
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Function to update the play/pause button display
function updatePlayButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  playButton.textContent = icon;
}

// Function to handle volume change
function handleVolumeChange() {
  video.volume = volumeSlider.value;
}

// Function to handle playback speed change
function handlePlaybackSpeedChange() {
  video.playbackRate = playbackSpeedSlider.value;
}

// Function to skip forward or backward
function skip() {
  const skipTime = parseFloat(this.dataset.skip);
  video.currentTime += skipTime;
}

// Function to update the progress bar
function handleProgress() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercent}%`;
}

// Function to scrub through the video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
volumeSlider.addEventListener('input', handleVolumeChange);
playbackSpeedSlider.addEventListener('input', handlePlaybackSpeedChange);
skipButtons.forEach(button => button.addEventListener('click', skip));
video.addEventListener('timeupdate', handleProgress);
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

